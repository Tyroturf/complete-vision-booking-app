import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
  });
};
