export class ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;

  constructor(success: boolean, code: number, message: string, data?: T) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.code = code;
  }

  static success<T>(message: string, data?: T, code = 200): ApiResponse<T> {
    return new ApiResponse(true, code, message, data);
  }

  static error(message: string, code: number): ApiResponse<undefined> {
    return new ApiResponse(false, code, message, undefined);
  }
}
