type ToastType = "success" | "error" | "info" | "pending";

export type ToastOptions = {
  title?: string;
  message?: string;
  type?: ToastType;
  appendTo?: HTMLElement;
};

export type ToastItemProps = Omit<ToastOptions, "appendTo"> & {
  onClose?(): void;
};

export type ToastCreateOption = ToastOptions & {
  seed: number;
};

export type ToastCreate = (options: ToastCreateOption) => DestroyCallback;

export type DestroyCallback = () => void;
