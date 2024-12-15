package ai.yuvi.modules.conversation.model.claude;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Claude {
    private static final String API_URL = "https://api.anthropic.com/v1/messages";
    private static final Duration TIMEOUT = Duration.ofSeconds(30);

    private final String apiKey;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    private Claude(Builder builder) {
        this.apiKey = builder.apiKey;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(TIMEOUT)
            .build();
        this.objectMapper = new ObjectMapper();
    }

    public Messages.Response messages(Messages messages) {
        try {
            String requestBody = objectMapper.writeValueAsString(messages);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Content-Type", "application/json")
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

            HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException("API request failed with status code: " + 
                    response.statusCode() + ", body: " + response.body());
            }

            return objectMapper.readValue(response.body(), Messages.Response.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send message to Claude API", e);
        }
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String apiKey;

        public Builder apiKey(String apiKey) {
            this.apiKey = apiKey;
            return this;
        }

        public Claude build() {
            if (apiKey == null || apiKey.isEmpty()) {
                throw new IllegalStateException("API key is required");
            }
            return new Claude(this);
        }
    }
}
