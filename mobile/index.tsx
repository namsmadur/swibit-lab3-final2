import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { login, setToken } from "../lib/api";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login(username, password);
      setToken(data.access_token);
      router.replace("/tasks");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" }}>
        Swibit Lab
      </Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20 }}
      />
      {loading ? <ActivityIndicator size="large" /> : <Button title="Login" onPress={handleLogin} />}
    </View>
  );
}
