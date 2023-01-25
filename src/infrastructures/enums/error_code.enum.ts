
export enum ErrorCode {
  SERVER_ERROR = 'An error occurred on the server',
  INVALID_CLIENT = 'Invalid client credentials.',
  BAD_REQUEST = 'The request could not be completed due to malformed syntax. Kindly crosscheck and try again.',
  UNAUTHORIZED_REQUEST = 'The request could not be completed because it lacks valid authentication credentials.',
  UNAUTHORIZED_CLIENT = 'Client does not have sufficient rights to access this service.',
  INVALID_REQUEST = 'The request is invalid',
  FORBIDDEN = 'You do not have sufficient rights to access this service.',
  NOT_FOUND = 'The requested resource was not found in the system.',
  UNPROCESSABLE_ENTITY = 'Unable to process the request data.',
  INVALID_CURRENT_PASSWORD = 'Invalid password.',
  NO_CYCLIC_PASSWORD_CHANGE = 'You cannot set your current password as the new one.',
  INVALID_COUNTRY_CODE = 'Unrecognized country code',
  INVALID_STATE_CODE = 'Unrecognized state code',
  INVALID_COUNTRY_PHONE = 'Invalid mobile number for specified country',
  INVALID_PAGE_NUM = 'Invalid page number',
  INVALID_PAGE_SIZE = 'Invalid page size',
  DUPLICATE_ROLE = 'This role already exists in the system',
  DUPLICATE_SECTOR_USER = 'User already exists in the system',
  INVALID_ROLE_ID = 'Invalid role ID',
  ALREADY_ACTIVATED_USER = 'Specified user has already been activated',
  CANNOT_UPDATE_PRIVILEGED_USER = 'Primary users cannot be updated. Please contact administrator',
  INACTIVE_ROLE_SPECIFIED = 'The specified role has been disabled',
  SERVICE_UNAVAILABLE = 'The service is currently unavailable. Please try again later.',
  INVALID_TOKEN = 'Invalid token',
  USER_INACTIVE = 'Account deactivated, contact support',
  USER_EMAIL_NOT_CONFIRMED = 'User email not confirmed',
  INVALID_USER_CREDENTIALS = 'Invalid username or password.',

}

export const getResponseCode = (response: ErrorCode) => {
  const index: number = Object.values(ErrorCode).indexOf(response);
  const code = (2 + index).toString().padStart(3, '0');
  return 'ERR' + code;
}