export interface FuncError {
  message: string;
  code?: string;
  errors?: unknown[];
}

export enum BaseErrorEnum {
  UNEXPECTED = "An unexpected error occurred. Please try again later.",
  USER_NOT_AUTHENTICATED = "You are not signed in. Please log in and try again.",
}
