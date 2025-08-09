// utils/toastHelper.ts
import { toast, ToastOptions } from "react-toastify";

const defaultSuccessOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  theme: "light",
};

const defaultErrorOptions: ToastOptions = {
  position: "top-right",
  autoClose: 6000,
  hideProgressBar: false,
  theme: "colored",
};

const defaultInfoOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: 4000,
  hideProgressBar: true,
  theme: "dark",
};

export function showSuccessToast(message: string, options?: ToastOptions) {
  toast.success(message, { ...defaultSuccessOptions, ...options });
}

export function showErrorToast(message: string, options?: ToastOptions) {
  toast.error(message, { ...defaultErrorOptions, ...options });
}

export function showInfoToast(message: string, options?: ToastOptions) {
  toast.info(message, { ...defaultInfoOptions, ...options });
}

// Generic toast (neutral)
export function showToast(message: string, options?: ToastOptions) {
  toast(message, options);
}
