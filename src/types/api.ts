export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
  timestamp: string;
}

// export interface ApiError {
//   code: number;
//   message: string;
// }

// export interface ApiResponse<T> {
//   data: T | null;
//   error: ApiError | null;
// }