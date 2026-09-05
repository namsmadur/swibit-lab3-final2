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
import { useRegister } from "../../features/auth/hooks/useRegister";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: register, isLoading } = useRegister();
  const router = useRouter();

  const handleRegister = () => {
    register(
      { email, password },
      {
        onSuccess: () => router.replace("/"),
        onError: (err: any) => alert(err.message),
      }
    );
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "#f8f9fc",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "#7c3aed",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              TaskFlow
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Create Account ✨
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Start managing your tasks efficiently
            </Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                padding: 14,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: "#f9fafb",
              }}
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
            <TextInput
              placeholder="Password (min 8 characters)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                padding: 14,
                marginBottom: 24,
                fontSize: 16,
                backgroundColor: "#f9fafb",
              }}
              placeholderTextColor="#9ca3af"
            />

            <TouchableOpacity
              onPress={handleRegister}
              style={{
                backgroundColor: "#7c3aed",
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                borderRadius: 12,
                padding: 14,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
              }}
            >
              <Text style={{ color: "#4b5563", fontSize: 14 }}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
