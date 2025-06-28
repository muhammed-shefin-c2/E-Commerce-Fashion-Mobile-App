export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent constructor with the message
    this.statusCode = statusCode || 500; // Set status code (default: 500)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Set status based on the code
    this.isOperational = true; // Flag to differentiate operational vs. programmer errors
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}
