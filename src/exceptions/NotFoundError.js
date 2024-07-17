import ClientError from "./ClientError";

class NotFoundError extends ClientError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export default NotFoundError;