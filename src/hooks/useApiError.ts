import { AxiosError } from 'axios';
import ApiError from '@apis/ApiError';
import { TOAST_MESSAGE } from '@constants/index';
import { useToast } from '@providers/ToastProvider';

const useApiError = () => {
  const { showToast } = useToast();

  const handleApiError = async (error: unknown) => {
    if (error instanceof AxiosError) {
      const message =
        (await ApiError.parsedErrorMessage(error)) ?? TOAST_MESSAGE.fail;

      showToast({
        type: 'fail',
        message,
      });
    }
  };

  return handleApiError;
};

export default useApiError;
