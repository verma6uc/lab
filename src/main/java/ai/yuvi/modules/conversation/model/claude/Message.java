package ai.yuvi.modules.conversation.model.claude;

public class Message {
    private String role;
    private String content;

    private Message(Builder builder) {
        this.role = builder.role;
        this.content = builder.content;
    }

    public String getRole() {
        return role;
    }

    public String getContent() {
        return content;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String role;
        private String content;

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Message build() {
            return new Message(this);
        }
    }
}
