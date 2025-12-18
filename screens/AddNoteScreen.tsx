import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "AddNote">;

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");

  const handleSaveNote = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Note content is required");
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      category,
      dateAdded: new Date().toISOString(),
    };

    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];

      notes.push(newNote);

      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      Alert.alert("Success", "Note added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Note</Text>

      <TextInput
        placeholder="Title (optional)"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Note content"
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Personal" value="Personal" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC",
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 25,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: "#333",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF7CC",
    fontSize: 16,
    fontWeight: "600",
  },
});
