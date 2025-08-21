import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

export const useToast = () => {
  const { theme } = useTheme();

  const showSuccessToast = (message: string) => {
    toast.success(message , { position : 'top-center' , autoClose : 1500 , theme : theme === 'dark' ? 'dark' : 'light'});
  };

  const showErrorToast = (message: string) => {
    toast.error(message , { position : 'top-center' , autoClose : 1500 , theme : theme === 'dark' ? 'dark' : 'light'});
  };

  const showInfoToast = (message: string) => {
    toast.info(message , { position : 'top-center' , autoClose : 1500 , theme : theme === 'dark' ? 'dark' : 'light'});
  };

  const showWarningToast = (message: string) => {
    toast.warning(message , { position : 'top-center' , autoClose : 1500 , theme : theme === 'dark' ? 'dark' : 'light'});
  };

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};
