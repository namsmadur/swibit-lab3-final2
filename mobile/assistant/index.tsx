import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView, Alert } from "react-native";
import { askAssistant } from "../../lib/api";

export default function AssistantScreen() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Please enter a question");
      return;
    }
    setLoading(true);
    setError(null);
    setAnswer("");
    setSources([]);
    try {
      const data = await askAssistant(query);
      setAnswer(data.answer || "No answer received.");
      setSources(data.sources || []);
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Ask Swibit AI</Text>
      <TextInput
        placeholder="Ask about task policies..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, minHeight: 80, textAlignVertical: "top", marginBottom: 16 }}
        multiline
      />
      {loading ? <ActivityIndicator size="large" /> : <Button title="Ask AI" onPress={handleAsk} />}
      {error && (
        <View style={{ marginTop: 20, padding: 16, backgroundColor: "#f8f9fa", borderRadius: 8 }}>
          <Text style={{ color: "red" }}>? {error}</Text>
        </View>
      )}
      {answer ? (
        <View style={{ marginTop: 20, padding: 16, backgroundColor: "#f8f9fa", borderRadius: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>?? AI Response:</Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>{answer}</Text>
          {sources.length > 0 && (
            <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#ddd" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>?? Sources:</Text>
              {sources.map((src, idx) => (
                <Text key={idx} style={{ fontSize: 14, color: "#007AFF", marginBottom: 2 }}>• {src}</Text>
              ))}
            </View>
          )}
        </View>
      ) : null}
    </ScrollView>
  );
}
