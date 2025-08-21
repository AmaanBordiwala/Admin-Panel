import { toast } from 'react-toastify';

export const useToast = () => {
  const showSuccessToast = (message: string) => {
    toast.success(message , { position : 'top-center' , autoClose : 1500});
  };

  const showErrorToast = (message: string) => {
    toast.error(message , { position : 'top-center' , autoClose : 1500});
  };

  const showInfoToast = (message: string) => {
    toast.info(message , { position : 'top-center' , autoClose : 1500});
  };

  const showWarningToast = (message: string) => {
    toast.warning(message , { position : 'top-center' , autoClose : 1500});
  };

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};
