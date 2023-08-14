export type ServiceResponseErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_DATA';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: {
    message: string
  }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED'
  data: T
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;