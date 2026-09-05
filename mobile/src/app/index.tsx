import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "../features/auth/hooks/useLogin";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: () => router.replace("/tabs"),
        onError: (err: any) => alert(err.message),
      }
    );
  };

  if (isLoading) return <ActivityIndicator size="large" color="#7c3aed" />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f3ff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* 🔹 بطاقة صغيرة وأنيقة */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 24,
            paddingVertical: 20,
            paddingHorizontal: 24,
            maxWidth: 380,
            width: "100%",
            alignSelf: "center",
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 8,
            borderWidth: 1,
            borderColor: "rgba(124,58,237,0.06)",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              color: "#7c3aed",
              textAlign: "center",
              marginBottom: 2,
              letterSpacing: -0.5,
            }}
          >
            TaskFlow
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1f2937",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Welcome Back! 👋
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#6b7280",
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            Sign in to continue and get things done
          </Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1.5,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 14,
              marginBottom: 12,
              fontSize: 14,
              backgroundColor: "#fafafa",
              color: "#1f2937",
            }}
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1.5,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 14,
              marginBottom: 18,
              fontSize: 14,
              backgroundColor: "#fafafa",
              color: "#1f2937",
            }}
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#7c3aed",
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: "center",
              marginBottom: 10,
              shadowColor: "#7c3aed",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/register")}
            style={{
              borderRadius: 12,
              paddingVertical: 10,
              alignItems: "center",
              borderWidth: 1.5,
              borderColor: "#e5e7eb",
            }}
          >
            <Text style={{ color: "#4b5563", fontSize: 14, fontWeight: "600" }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
