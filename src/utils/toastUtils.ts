// toastUtils.ts
import {toast} from 'react-toastify';
import {toastConfig} from '../config/toast';

export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};

export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

export const showWarningToast = (message: string) => {
  toast.warning(message, toastConfig);
};
