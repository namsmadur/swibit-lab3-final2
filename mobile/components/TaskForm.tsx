import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Switch } from "react-native";

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialCompleted?: boolean;
  onSubmit: (title: string, description: string, completed: boolean) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  initialCompleted = false,
  onSubmit,
  isLoading = false,
  submitLabel = "Submit",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Title</Text>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12 }}
      />
      <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Description</Text>
      <TextInput
        placeholder="Enter description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, minHeight: 80, textAlignVertical: "top" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ fontWeight: "bold", marginRight: 10 }}>Completed</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>
      {isLoading ? <ActivityIndicator size="large" /> : <Button title={submitLabel} onPress={() => onSubmit(title, description, completed)} />}
    </View>
  );
}
