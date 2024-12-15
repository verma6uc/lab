package ai.yuvi.modules.conversation.model.claude;

import java.util.ArrayList;
import java.util.List;

public class Messages {
    private String model;
    private Integer maxTokens;
    private List<Message> messages;

    private Messages(Builder builder) {
        this.model = builder.model;
        this.maxTokens = builder.maxTokens;
        this.messages = builder.messages;
    }

    public String getModel() {
        return model;
    }

    public Integer getMaxTokens() {
        return maxTokens;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String model;
        private Integer maxTokens;
        private List<Message> messages = new ArrayList<>();

        public Builder model(String model) {
            this.model = model;
            return this;
        }

        public Builder maxTokens(Integer maxTokens) {
            this.maxTokens = maxTokens;
            return this;
        }

        public Builder messages(List<Message> messages) {
            this.messages = messages;
            return this;
        }

        public Messages build() {
            return new Messages(this);
        }
    }

    public static class Response {
        private List<Content> content;
        private Usage usage;

        public List<Content> content() {
            return content;
        }

        public Usage usage() {
            return usage;
        }

        public static class Content {
            private String text;

            public String text() {
                return text;
            }
        }

        public static class Usage {
            private Integer inputTokens;
            private Integer outputTokens;

            public Integer inputTokens() {
                return inputTokens;
            }

            public Integer outputTokens() {
                return outputTokens;
            }
        }
    }
}
