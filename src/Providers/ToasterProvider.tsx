import {ToastContainer, toast, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom hook to manage toast notifications
export const useToast = () => {
  const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {...defaultOptions, ...options});
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {...defaultOptions, ...options});
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {...defaultOptions, ...options});
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warn(message, {...defaultOptions, ...options});
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

// ToastProvider Component to be wrapped around the main app
export const ToastProvider = ({children}: {children: JSX.Element}) => (
  <>
    {children}
    <ToastContainer limit={3} className="toast-custom" />
  </>
);
