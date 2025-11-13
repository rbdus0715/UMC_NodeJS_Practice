export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UserNotFoundError extends ApiError {
  constructor(userId?: string) {
    super(userId ? `User with ID ${userId} not found` : 'User not found', 404);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
