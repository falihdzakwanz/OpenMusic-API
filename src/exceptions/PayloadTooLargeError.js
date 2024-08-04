import ClientError from './ClientError.js';

class PayloadTooLargeError extends ClientError {
  constructor(message) {
    super(message, 413);
    this.name = 'PayloadTooLargeError';
  }
}

export default PayloadTooLargeError;
