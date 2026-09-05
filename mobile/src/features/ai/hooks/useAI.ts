import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import Toast from "react-native-toast-message";

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useMutation({
    mutationFn: ({ messages, context }: { messages: any[]; context?: string }) =>
      aiApi.chat(messages, context),
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onError: (err: any) => {
      Toast.show({ type: "error", text1: "AI Error", text2: err.message });
    },
  });

  return { sendMessage, isLoading };
};
