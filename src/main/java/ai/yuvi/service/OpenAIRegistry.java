package ai.yuvi.service;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.CompletionException;
import java.util.concurrent.TimeoutException;
import java.util.logging.Logger;

import org.apache.http.client.HttpResponseException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.api.HarmCategory;
import com.google.cloud.vertexai.api.SafetySetting;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import com.knuddels.jtokkit.Encodings;
import com.knuddels.jtokkit.api.Encoding;
import com.knuddels.jtokkit.api.EncodingRegistry;
import com.knuddels.jtokkit.api.EncodingType;
import com.theokanning.openai.completion.chat.ChatMessage;

import ai.yuvi.config.ConfigProperties;
import io.github.sashirestela.openai.SimpleOpenAI;
import io.github.sashirestela.openai.common.ResponseFormat;
import io.github.sashirestela.openai.common.ResponseFormat.JsonSchema;
import io.github.sashirestela.openai.domain.chat.ChatMessage.UserMessage;
import io.github.sashirestela.openai.domain.chat.ChatRequest;

/**
 * The {@code OpenAIRegistry} class centralizes interaction with various Large Language Models (LLMs),
 * including multiple OpenAI GPT models and fallback solutions like Gemini and Claude. It provides:
 * <ul>
 *   <li>Methods to interact with multiple GPT-based models (gpt-3.5-turbo, gpt-4, gpt-4o, etc.).</li>
 *   <li>Automatic fallback to Gemini or Claude models if token limits are exceeded.</li>
 *   <li>Support for JSON, structured output, and text responses from LLMs.</li>
 *   <li>Integration with {@link DatabaseLogger} to record requests and responses for auditing and analysis.</li>
 * </ul>
 *
 * <p>This class relies on:
 * <ul>
 *   <li>{@link SimpleOpenAI} for simplified OpenAI API integration.</li>
 *   <li>{@link DatabaseLogger#logConversation(String, List, String, int, int, double, String, Integer, Object, String)}
 *   for logging conversations to the database.</li>
 *   <li>Google's Vertex AI for handling Gemini models as a fallback if token counts exceed thresholds.</li>
 * </ul>
 *
 * <p>Ensure that appropriate credentials and environment variables are set for both OpenAI and Vertex AI integrations.
 */
public class OpenAIRegistry {

    // OpenAI API key read from configuration
    static String apiKey = ConfigProperties.getProperty("openai.api.key");

    // Logger for diagnostic logging
    private static final Logger LOGGER = Logger.getLogger(OpenAIRegistry.class.getName());

    // Whether detailed logging of request/response is enabled
    private static final boolean DETAILED_LOGGING = Boolean.parseBoolean(ConfigProperties.getProperty("openai.detailed.logging", "false"));

    // Token counting and encoding utilities
    private final EncodingRegistry registry = Encodings.newDefaultEncodingRegistry();
    private final Encoding enc = registry.getEncoding(EncodingType.CL100K_BASE);

    // Credentials for Google Vertex AI (Gemini)
    private static GoogleCredentials cred = null;

    // SimpleOpenAI client for OpenAI requests
    private static SimpleOpenAI openAI = SimpleOpenAI.builder().apiKey(apiKey).build();

    /**
     * Constructor that initializes GoogleCredentials for Vertex AI by loading from a JSON key file.
     * Logs or prints stack traces if an error occurs in loading credentials.
     */
    public OpenAIRegistry() {
        try {
            InputStream resourceStream = getClass().getClassLoader().getResourceAsStream("xenon-poet-415019-2bb198005f66.json");
            if (resourceStream == null) {
                throw new FileNotFoundException("Resource file not found.");
            }
            cred = ServiceAccountCredentials.fromStream(resourceStream)
                    .createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Provides Gemini credentials if not already loaded.
     * Ensures {@code cred} is initialized before using Gemini models.
     */
    private static void getGeminiCred() {
        if (cred == null) {
            try {
                InputStream resourceStream = OpenAIRegistry.class.getClassLoader()
                        .getResourceAsStream("xenon-poet-415019-2bb198005f66.json");
                if (resourceStream == null) {
                    throw new FileNotFoundException("Resource file not found.");
                }
                cred = ServiceAccountCredentials.fromStream(resourceStream)
                        .createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Calls GPT-4o-mini model expecting a JSON_OBJECT response format.
     */
    public String chatCompletionGPT40MiniJSON(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        return chatCompletion(messages, "gpt-4o-mini", 1.0, 16384, 1.0, 0.0, 0.0, ResponseFormat.JSON_OBJECT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4o-mini model with text response, falling back to other models if token counts exceed thresholds.
     */
    public String chatCompletionGPT40Mini(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info(goal + " :: Using gpt-4o-mini with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count " + requestTokens + ", falling back to gemini");
            return processgeminiAIRequest(messages);
        } else if (requestTokens > 128000) {
            System.out.println(goal + " :: Exceeded Token Count " + requestTokens + ", falling back to claudeHaiku");
            return claudeHaiku(messages, goal, applicationContext, contextName);
        }

        return chatCompletion(messages, "gpt-4o-mini", 1.0, 16384, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4-turbo model with text responses.
     */
    public String chatCompletionGPT4(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        return chatCompletion(messages, "gpt-4-turbo", 1.0, 4096, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4o model expecting a JSON_OBJECT response format.
     */
    public String chatCompletionGPT4oJSON(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        return chatCompletion(messages, "gpt-4o", 1.0, 16384, 1.0, 0.0, 0.0, ResponseFormat.JSON_OBJECT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4o model expecting a structured output defined by a given class schema.
     */
    public String chatCompletionGPT4oStrcuturedOutput(List<ChatMessage> messages,
            Class<?> class1, String className, String goal, Integer applicationContext, String contextName) {
        return chatCompletionStructure(messages, "gpt-4o", 1, 16384, 1.0, 0.0, 0.0,
                class1, className, goal, applicationContext, contextName);
    }

    /**
     * Calls the "o1-preview" model with reasoning capabilities, using fallback logic if tokens exceed limits.
     */
    public String chatCompletionGPTo1(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info(goal + " :: Using o1-preview with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to gemini");
            return processgeminiAIRequest(messages);
        } else if (requestTokens > 128000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to claude");
            return claude(messages, goal, applicationContext, contextName);
        } else {
            return chatCompletionReasoning(messages, "o1-preview", 1.0, 32768, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                    goal, applicationContext, contextName);
        }
    }

    /**
     * Similar to {@link #chatCompletionGPTo1(List, String, Integer, String)} but uses "o1-mini" model.
     */
    public String chatCompletionGPTo1Mini(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info(goal + " :: Using o1-mini with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to gemini");
            return processgeminiAIRequest(messages);
        } else if (requestTokens > 128000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to claude");
            return claude(messages, goal, applicationContext, contextName);
        }
        return chatCompletionReasoning(messages, "o1-mini", 1.0, 65536, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4o model, using fallback to other models if tokens exceed thresholds.
     */
    public String chatCompletionGPT4o(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info(goal + " :: Using gpt-4o with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to gemini");
            return processgeminiAIRequest(messages);
        } else if (requestTokens > 128000) {
            System.out.println(goal + " :: Exceeded Token Count, falling back to claude");
            return claude(messages, goal, applicationContext, contextName);
        }

        return chatCompletion(messages, "gpt-4o", 1.0, 16384, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-3.5-turbo model with text responses.
     */
    public String chatCompletionGPT35(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        return chatCompletion(messages, "gpt-3.5-turbo", 1.0, 4096, 1.0, 0.0, 0.0, ResponseFormat.TEXT,
                goal, applicationContext, contextName);
    }

    /**
     * Calls GPT-4o model expecting structured output specified by a given class schema.
     */
    public String chatCompletionGPT4oStructuredOutput(List<ChatMessage> messages, Class<?> class1, String className, String goal,
            Integer applicationContext, String contextName) {
        return chatCompletionStructure(messages, "gpt-4o", 1, 16384, 1.0, 0.0, 0.0,
                class1, className, goal, applicationContext, contextName);
    }

    /**
     * Uses large output token model logic, ultimately calling {@link #chatCompletionGPTo1(List, String, Integer, String)}.
     */
    public String largeOutputTokenModel(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        return chatCompletionGPTo1(messages, goal, applicationContext, contextName);
    }

    /**
     * Handles reasoning with a given model, providing fallback to Claude in case of timeout or other exceptions.
     */
    private String chatCompletionReasoning(List<ChatMessage> messages, String model, double temperature, int maxTokens,
            double topP, double frequencyPenalty, double presencePenalty, ResponseFormat responseFormat, String goal,
            Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info("Sending request to " + model + " with " + requestTokens + " tokens");

        Collection<UserMessage> messages1 = convertMessages(messages);

        // Record the start time
        long startTime = System.currentTimeMillis();

        ChatRequest chatRequest = ChatRequest.builder().model(model).messages(messages1).temperature(temperature)
                .topP(topP).frequencyPenalty(frequencyPenalty).presencePenalty(presencePenalty)
                .responseFormat(responseFormat).build();

        String responseContent = null;
        int responseCode = -1;

        try {
            var futureChat = openAI.chatCompletions().create(chatRequest);
            var chatResponse = futureChat.join();

            // Compute execution time
            long endTime = System.currentTimeMillis();
            double executionTime = (endTime - startTime) / 1000.0;

            // Calculate response tokens
            int responseTokens = enc.countTokens(chatResponse.firstContent());

            responseContent = chatResponse.firstContent();
            responseCode = 200;

            // Log the request and response
            logRequestResponse(model, messages, responseContent, requestTokens, responseTokens, executionTime, goal,
                    applicationContext, contextName);

        } catch (CompletionException e) {
            // Handle exceptions during API call
            Throwable cause = e.getCause();
            if (cause instanceof HttpResponseException) {
                HttpResponseException httpException = (HttpResponseException) cause;
                responseCode = httpException.getStatusCode();
                LOGGER.warning("HTTP error code: " + responseCode + ", Message: " + httpException.getMessage());
            } else if (cause instanceof TimeoutException) {
                responseCode = 408;
                LOGGER.warning("Request timed out: " + e.getMessage());
                return claude(messages, goal, applicationContext, contextName);
            } else {
                LOGGER.severe("Unexpected error: " + e.getMessage());
            }
            throw e;
        } catch (Exception e) {
            LOGGER.severe("General error occurred: " + e.getMessage());
            throw e;
        }

        return responseContent;
    }

    /**
     * Generic chat completion request to a model, supports multiple response formats.
     */
    private String chatCompletion(List<ChatMessage> messages, String model, double temperature, int maxTokens,
            double topP, double frequencyPenalty, double presencePenalty, ResponseFormat responseFormat, String goal,
            Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info("Sending request to " + model + " with " + requestTokens + " tokens");

        Collection<UserMessage> messages1 = convertMessages(messages);

        // Record start time
        long startTime = System.currentTimeMillis();

        ChatRequest chatRequest = ChatRequest.builder().model(model).messages(messages1).temperature(temperature)
                .maxTokens(maxTokens).topP(topP).frequencyPenalty(frequencyPenalty).presencePenalty(presencePenalty)
                .responseFormat(responseFormat).build();

        var futureChat = openAI.chatCompletions().create(chatRequest);
        var chatResponse = futureChat.join();

        // Compute execution time
        long endTime = System.currentTimeMillis();
        double executionTime = (endTime - startTime) / 1000.0;
        int responseTokens = enc.countTokens(chatResponse.firstContent());

        // Log request and response
        logRequestResponse(model, messages, chatResponse.firstContent(), requestTokens, responseTokens, executionTime,
                goal, applicationContext, contextName);
        return chatResponse.firstContent();
    }

    /**
     * Chat completion request expecting a structured output defined by a class schema.
     */
    private String chatCompletionStructure(List<ChatMessage> messages, String model, double temperature, int maxTokens,
            double topP, double frequencyPenalty, double presencePenalty, Class<?> class1, String className, String goal,
            Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info("Sending request to " + model + " with " + requestTokens + " tokens");

        Collection<UserMessage> messages1 = convertMessages(messages);

        // Record start time
        long startTime = System.currentTimeMillis();

        JsonSchema jsonSchema = JsonSchema.builder().name(className).schemaClass(class1).build();
        ResponseFormat rp = ResponseFormat.jsonSchema(jsonSchema);

        ChatRequest chatRequest = ChatRequest.builder().model(model).messages(messages1).temperature(temperature)
                .maxTokens(maxTokens).topP(topP).frequencyPenalty(frequencyPenalty).presencePenalty(presencePenalty)
                .responseFormat(rp).build();

        var futureChat = openAI.chatCompletions().create(chatRequest);
        var chatResponse = futureChat.join();

        // Compute execution time
        long endTime = System.currentTimeMillis();
        double executionTime = (endTime - startTime) / 1000.0;
        int responseTokens = enc.countTokens(chatResponse.firstContent());

        // Log request and response
        logRequestResponse(model, messages, chatResponse.firstContent(), requestTokens, responseTokens, executionTime,
                goal, applicationContext, contextName);
        return chatResponse.firstContent();
    }

    /**
     * Logs the request and response to the database using {@link DatabaseLogger}.
     * Also prints detailed logs if DETAILED_LOGGING is enabled.
     */
    private void logRequestResponse(String model, List<ChatMessage> messages, String chatResponse, int requestTokens,
            int responseTokens, double executionTime, String goal, Integer applicationContext, String contextName) {

        DatabaseLogger.logConversation(model, messages, chatResponse, requestTokens, responseTokens, executionTime,
                goal, applicationContext, null, contextName);

        if (DETAILED_LOGGING) {
            StringBuilder log = new StringBuilder();
            log.append("=== OpenAI Request/Response Log ===\n");
            log.append("Model: ").append(model).append("\n");
            log.append("Goal: ").append(goal).append("\n");
            log.append("Application Context (ID): ").append(applicationContext).append("\n");
            log.append("Context Name: ").append(contextName).append("\n");
            log.append("Execution Time: ").append(executionTime).append(" seconds\n");
            log.append("Request Tokens: ").append(requestTokens).append("\n");
            log.append("Response Tokens: ").append(responseTokens).append("\n");
            log.append("--- Request ---\n");
            for (ChatMessage message : messages) {
                log.append(message.getRole()).append(": ").append(message.getContent()).append("\n");
            }
            log.append("--- Response ---\n");
            log.append(chatResponse).append("\n");
            log.append("==============================\n");

            LOGGER.info(log.toString());
        }
    }

    /**
     * Counts tokens for a list of messages by summing up the tokens from role + content.
     */
    private int countTokens(List<ChatMessage> messages) {
        int totalTokens = 0;
        for (ChatMessage message : messages) {
            totalTokens += enc.countTokens(message.getRole() + ": " + message.getContent());
        }
        return totalTokens;
    }

    /**
     * Counts tokens for a single message.
     */
    public int countMessageTokens(ChatMessage message) {
        return enc.countTokens(message.getRole() + ": " + message.getContent());
    }

    /**
     * Converts a list of {@link ChatMessage} (theokanning.openai) into a collection of {@link UserMessage}
     * for use with the {@link SimpleOpenAI} API.
     */
    private Collection<UserMessage> convertMessages(List<ChatMessage> messages) {
        Collection<UserMessage> messages1 = new ArrayList<>();
        for (ChatMessage chatMessage : messages) {
            if (chatMessage.getContent() != null) {
                messages1.add(UserMessage.of(chatMessage.getContent()));
            }
        }
        return messages1;
    }

    /**
     * If token count exceeds certain thresholds, request is sent to Gemini model via Vertex AI.
     * Fallback method if main model requests exceed size or capability.
     */
    public static String processgeminiAIRequest(List<ChatMessage> inputMessages) {
        LOGGER.info("Sending geminiAIRequest");
        getGeminiCred();
        try (VertexAI vertexAi = new VertexAI("xenon-poet-415019", "us-central1", cred)) {
            GenerationConfig generationConfig = GenerationConfig.newBuilder().setMaxOutputTokens(8192)
                    .setTemperature(1F).setTopP(0.95F).build();
            List<SafetySetting> safetySettings = Arrays.asList(
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build());

            GenerativeModel model = new GenerativeModel("gemini-1.5-pro-002", vertexAi);
            model.setGenerationConfig(generationConfig);
            model.setSafetySettings(safetySettings);

            Object[] allContents = inputMessages.stream()
                    .map(ChatMessage::getContent).toArray(String[]::new);

            var content = ContentMaker.fromMultiModalData(allContents);
            GenerateContentResponse response = model.generateContent(content);

            return ResponseHandler.getText(response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Similar to {@link #processgeminiAIRequest(List)} but uses "gemini-1.5-flash-002" model as a fallback variant.
     */
    public static String processgeminiAIFlashRequest(List<ChatMessage> inputMessages) {
        LOGGER.info("Sending geminiAIFlashRequest");
        getGeminiCred();
        try (VertexAI vertexAi = new VertexAI("xenon-poet-415019", "us-central1", cred)) {
            GenerationConfig generationConfig = GenerationConfig.newBuilder().setMaxOutputTokens(8192)
                    .setTemperature(1F).setTopP(0.95F).build();
            List<SafetySetting> safetySettings = Arrays.asList(
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build(),
                    SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_ONLY_HIGH).build());

            GenerativeModel model = new GenerativeModel("gemini-1.5-flash-002", vertexAi);
            model.setGenerationConfig(generationConfig);
            model.setSafetySettings(safetySettings);

            Object[] allContents = inputMessages.stream()
                    .map(ChatMessage::getContent).toArray(String[]::new);

            var content = ContentMaker.fromMultiModalData(allContents);
            GenerateContentResponse response = model.generateContent(content);

            return ResponseHandler.getText(response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Calls Claude model as a fallback when OpenAI requests exceed token limits or fail.
     * Uses {@link ClaudeEngine} to process the prompt.
     */
    public String claude(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info("Sending request to Claude with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count, using gemini fallback");
            return processgeminiAIRequest(messages);
        }

        long startTime = System.currentTimeMillis();

        StringBuilder data = new StringBuilder();
        for (ChatMessage chatMessage : messages) {
            data.append(chatMessage.getContent()).append("\n");
        }

        String response = null;
        try {
            response = new ClaudeEngine().getReponse(data.toString());
        } catch (Exception e) {
            if (e.getMessage().contains("prompt is too long")) {
                return processgeminiAIRequest(messages);
            } else if (e.getMessage().contains("This request would exceed your organization’s rate limit")) {
                return processgeminiAIRequest(messages);
            }
            throw e;
        }

        long endTime = System.currentTimeMillis();
        double executionTime = (endTime - startTime) / 1000.0;
        int responseTokens = enc.countTokens(response);

        logRequestResponse("CLAUDE", messages, response, requestTokens, responseTokens, executionTime, goal,
                applicationContext, contextName);
        return response;
    }

    /**
     * Calls Claude Haiku as a special fallback scenario for extremely large prompts.
     */
    public String claudeHaiku(List<ChatMessage> messages, String goal, Integer applicationContext, String contextName) {
        int requestTokens = countTokens(messages);
        LOGGER.info("Sending request to Claude Haiku with " + requestTokens + " tokens");

        if (requestTokens > 200000) {
            System.out.println(goal + " :: Exceeded Token Count, using gemini fallback");
            return processgeminiAIRequest(messages);
        }

        StringBuilder data = new StringBuilder();
        for (ChatMessage chatMessage : messages) {
            data.append(chatMessage.getContent()).append("\n");
        }

        long startTime = System.currentTimeMillis();

        String response = null;
        try {
            response = new ClaudeEngine().getHaikuReponse(data.toString());
        } catch (Exception e) {
            if (e.getMessage().contains("prompt is too long")) {
                return processgeminiAIRequest(messages);
            }
            throw e;
        }

        long endTime = System.currentTimeMillis();
        double executionTime = (endTime - startTime) / 1000.0;
        int responseTokens = enc.countTokens(response);

        logRequestResponse("CLAUDE HAIKU", messages, response, requestTokens, responseTokens, executionTime, goal,
                applicationContext, contextName);
        return response;
    }
}
