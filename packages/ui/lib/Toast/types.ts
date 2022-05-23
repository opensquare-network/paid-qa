type ToastType = "success" | "error" | "info" | "pending";

export type ToastOptions = {
  title?: string;
  message?: string;
  type?: ToastType;
  /**
   * @default 5000
   */
  timeout?: false | number;
  appendTo?: HTMLElement;
};

export type ToastItemProps = Omit<ToastOptions, "appendTo"> & {
  sortedIndex: number;
  onClose?(): void;
};

export type ToastCreateOption = ToastOptions & {
  seed: number;
};

export type ToastCreate = (options: ToastCreateOption) => DestroyCallback;

export type DestroyCallback = () => void;
