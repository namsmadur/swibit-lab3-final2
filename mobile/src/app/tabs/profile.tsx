import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f3ff", padding: 20, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 32,
          padding: 24,
          width: "100%",
          maxWidth: 380,
          shadowColor: "#7c3aed",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 10,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(124,58,237,0.08)",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#7c3aed",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 14,
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text style={{ fontSize: 34, color: "#fff", fontWeight: "700" }}>
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#1f2937" }}>
          {user?.email || "Guest User"}
        </Text>
        <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          {user?.email || "No email"}
        </Text>

        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#f3f4f6",
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 16,
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#1f2937", fontSize: 16, fontWeight: "500" }}>⚙️ Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#f3f4f6",
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 16,
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#1f2937", fontSize: 16, fontWeight: "500" }}>🛡️ Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signOut}
          style={{
            width: "100%",
            backgroundColor: "#fee2e2",
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#dc2626", fontSize: 16, fontWeight: "600" }}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 20, color: "#9ca3af", fontSize: 12 }}>TaskFlow v1.0.0</Text>
    </View>
  );
}
