import { toast } from "react-toastify";

const toastStyle = {
  background: "rgba(255, 255, 255, 0.55)",
  boxShadow: "0 4px 30px #4747470b",
  borderRadius: 16,
  backdropFilter: "blur(3.1px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

export const successToast = (message: string) =>
  toast.success(message, { style: toastStyle });

export const errorToast = (message: string) =>
  toast.error(message, { style: toastStyle });
