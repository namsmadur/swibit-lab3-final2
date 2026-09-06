import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import { useAuth } from "./useAuth";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      console.log("?? [useLogin] Sending login request for:", email);
      return authApi.login(email, password);
    },
    onSuccess: (data) => {
      console.log("? [useLogin] Login success, token:", data.access_token ? data.access_token.substring(0, 20) + "..." : "null");
      signIn(data.access_token);
      Toast.show({ type: "success", text1: "Login successful" });
    },
    onError: (err: any) => {
      console.error("? [useLogin] Login error:", err);
      Toast.show({ type: "error", text1: "Login failed", text2: err.message });
    },
  });
};

