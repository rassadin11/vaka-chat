export class FieldError extends Error {
    constructor(field, message, status = 400) {
        super(message);
        this.field = field;
        this.status = status;
    }
}