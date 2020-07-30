package com.customer.endpoint.error;

public class ValidationErrorDetails extends ErrorDetails {

    public static final class Builder {
        private String title;
        private int status;
        private String detail;
        private long timestamp;
        private String developerMessage;

        private Builder () {
        }

        public static Builder newBuilder () {
            return new Builder();
        }

        public Builder title (String title) {
            this.title = title;
            return this;
        }

        public Builder status (int status) {
            this.status = status;
            return this;
        }

        public Builder detail (String detail) {
            this.detail = detail;
            return this;
        }

        public Builder timestamp (long timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Builder developerMessage (String developerMessage) {
            this.developerMessage = developerMessage;
            return this;
        }

        public ValidationErrorDetails build () {
            ValidationErrorDetails validationErrorDetails = new ValidationErrorDetails();
            validationErrorDetails.setStatus(status);
            validationErrorDetails.setDetail(detail);
            validationErrorDetails.setTimestamp(timestamp);
            validationErrorDetails.setDeveloperMessage(developerMessage);
            validationErrorDetails.setTitle(title);
            return validationErrorDetails;
        }
    }
}
