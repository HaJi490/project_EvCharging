export interface ApiError {
  code: number;
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}