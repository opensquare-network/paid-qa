type ToastType = "success" | "error" | "info" | "pending";

export type ToastOptions = {
  title?: string;
  message?: string;
  type?: ToastType;
  appendTo?: HTMLBodyElement;
};

export type ToastItemProps = Omit<ToastOptions, "appendTo"> & {
  onClose?(): void;
};

export type DestroyCallback = () => void;
