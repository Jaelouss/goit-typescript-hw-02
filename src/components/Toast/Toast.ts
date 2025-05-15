import toast from "react-hot-toast";

type ToastState = "success" | "error" | "loading";

const toastOptions = {
  position: "top-right" as const,
  style: {
    border: "2px solid red",
  },
};

export const notify = (state: ToastState, message: string) =>
  toast[state](message, { ...toastOptions });
