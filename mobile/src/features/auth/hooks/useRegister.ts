import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import Toast from "react-native-toast-message";

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.register(email, password),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Registration successful. Please login." });
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: "Registration failed", text2: err.message });
    },
  });
};
