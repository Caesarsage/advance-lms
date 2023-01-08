
export enum ErrorCode {
  SERVER_ERROR = 'An error occurred on the server',
  INVALID_REQUEST = 'The request is invalid',
}

export const getResponseCode = (response: ErrorCode) => {
  const index: number = Object.values(ErrorCode).indexOf(response);
  const code = (2 + index).toString().padStart(3, '0');
  return 'ERR' + code;
}