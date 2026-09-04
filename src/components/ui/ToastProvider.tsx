"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#0b1f2a",
          color: "#fff",
          fontSize: "14px",
        },
      }}
    />
  );
}
