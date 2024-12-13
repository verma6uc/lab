package ai.yuvi.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import com.theokanning.openai.completion.chat.ChatMessageRole;

import ai.yuvi.config.ConfigProperties;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.anthropic.AnthropicChatModel;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;

public class ClaudeEngine {

	public String getReponse(String data) {
		ChatLanguageModel model = AnthropicChatModel.builder().apiKey(ConfigProperties.getProperty("antropic_key"))
				.modelName("claude-3-5-sonnet-latest").timeout(Duration.ofMinutes(2)).maxTokens(8192)
				.beta("max-tokens-3-5-sonnet-2024-07-15").temperature(1.0).build();

		String answer = model.generate(data);

		return answer;
	}
	
	public String getHaikuReponse(String data) {
		ChatLanguageModel model = AnthropicChatModel.builder().apiKey(ConfigProperties.getProperty("antropic_key"))
				.modelName("claude-3-5-haiku-latest").timeout(Duration.ofMinutes(2)).maxTokens(8192)
				.beta("max-tokens-3-5-sonnet-2024-07-15").temperature(1.0).build();

		String answer = model.generate(data);

		return answer;
	}

	public String getResponse(List<com.theokanning.openai.completion.chat.ChatMessage> messages) {
		ChatLanguageModel model = AnthropicChatModel.builder().apiKey(ConfigProperties.getProperty("antropic_key"))
				.modelName("claude-3-5-sonnet-20241022").timeout(Duration.ofMinutes(2)).maxTokens(8192)
				.beta("max-tokens-3-5-sonnet-2024-07-15").temperature(1.0).build();

		List<ChatMessage> chatMessages = new ArrayList<>();
		StringBuilder combinedUserMessage = new StringBuilder();
		boolean lastMessageWasUser = false;

		for (com.theokanning.openai.completion.chat.ChatMessage message : messages) {
			if (message.getContent() == null || message.getContent().isBlank()) {
				continue;
			}
			if (message.getRole().equals(ChatMessageRole.USER.value())) {
				// If the last message was also from the user, append this message to the
				// previous one
				if (lastMessageWasUser) {
					combinedUserMessage.append("\n").append(message.getContent());
				} else {
					// Otherwise, start a new user message
					combinedUserMessage = new StringBuilder(message.getContent());
					lastMessageWasUser = true;
				}
			} else {
				// If the previous messages were from a user, add the combined user message to
				// the list
				if (lastMessageWasUser) {
					chatMessages.add(new UserMessage(combinedUserMessage.toString()));
					combinedUserMessage.setLength(0); // Reset the builder
					lastMessageWasUser = false;
				}
				// Add assistant or system messages to the list as usual
				if (message.getRole().equals(ChatMessageRole.ASSISTANT.value())) {
					chatMessages.add(new AiMessage(message.getContent()));
				} else {
					chatMessages.add(new SystemMessage(message.getContent()));
				}
			}
		}

		// After the loop, add any remaining user message
		if (lastMessageWasUser && combinedUserMessage.length() > 0) {
			chatMessages.add(new UserMessage(combinedUserMessage.toString()));
		}

		Response<AiMessage> answer = model.generate(chatMessages);

		return answer.content().text();
	}
}