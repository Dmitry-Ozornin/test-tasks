export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  text: string;
  type: ToastType;
  duration: number;
}

export type CreateToast = {
  text: string;
  type: ToastType;
  duration?: number;
};
