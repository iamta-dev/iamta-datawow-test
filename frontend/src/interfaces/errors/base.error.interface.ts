export interface FuncError {
  message: string;
  code?: string;
  errors?: unknown[];
}

export enum BaseErrorEnum {
  UNEXPECTED = "An unexpected error occurred. Please try again later.",
}
