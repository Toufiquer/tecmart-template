import { toast } from 'react-toastify';

export const handleSuccess = (message: string) => {
  toast.success(message, {
    toastId: (Math.random() * 1000).toFixed(0),
    position: 'top-center',
  });
};

export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    toast.error(e.message, {
      toastId: (Math.random() * 1000).toFixed(0),
      position: 'top-center',
    });
  }
};
