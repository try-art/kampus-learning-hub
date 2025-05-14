
import React from "react";
import { ToastT } from "sonner";

export type ToastVariant = "default" | "destructive";

export type ToasterToast = ToastT & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: ToastVariant;
};

export interface ToastState {
  toasts: ToasterToast[];
}

export type Toast = Omit<ToasterToast, "id">;

export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 1000000;
