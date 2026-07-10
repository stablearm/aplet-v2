"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      dir="rtl"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        className: "font-sans",
      }}
    />
  );
}
