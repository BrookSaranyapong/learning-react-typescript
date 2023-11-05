// Toast.ts
import { useToast, UseToastOptions } from "@chakra-ui/react";

type ToastStatus = "success" | "error" | "info" | "warning" | "loading";

function useCustomToast() {
  const toast = useToast();

  const showToast = (status: ToastStatus, message: string, title?: string) => {
    const options: UseToastOptions = {
      title: title,
      description: message,
      status: status,
      duration: status === "success" ? 2000 : 3000,
      isClosable: true,
      position: "top",
    };

    toast(options);
  };

  return showToast;
}

export default useCustomToast;
