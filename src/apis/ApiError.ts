import { AxiosError } from 'axios';

export default class ApiError extends AxiosError {
  constructor(message) {
    super(message);
  }

  static parsedErrorMessage(error: AxiosError) {
    const errorMessage = error?.response?.data as object;
    for (const key in errorMessage) {
      if (key) {
        return errorMessage[key].toString();
      }
    }
  }
}
