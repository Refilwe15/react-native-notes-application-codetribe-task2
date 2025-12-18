import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  dateAdded: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "EditNote">;

const EditNoteScreen: React.FC<Props> = ({ route, navigation }) => {
  const { noteId } = route.params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");

  // LOAD NOTE DATA
  const loadNote = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    if (storedNotes) {
      const notes: Note[] = JSON.parse(storedNotes);
      const note = notes.find((n) => n.id === noteId);

      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
      }
    }
  };

  // UPDATE NOTE
  const handleUpdate = async () => {
    if (!title || !content) {
      Alert.alert("Error", "Title and content are required");
      return;
    }

    const storedNotes = await AsyncStorage.getItem("notes");
    if (!storedNotes) return;

    const notes: Note[] = JSON.parse(storedNotes);

    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            title,
            content,
            category,
            dateAdded: new Date().toISOString(), // updated timestamp
          }
        : note
    );

    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    Alert.alert("Success", "Note updated successfully");
    navigation.goBack();
  };

  useEffect(() => {
    loadNote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      <Text style={styles.subtitle}>Update your note details</Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#777"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Content"
        placeholderTextColor="#777"
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Personal" value="Personal" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateText}>Update Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC",
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    padding: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    marginBottom: 30,
    overflow: "hidden",
  },
  updateButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  updateText: {
    color: "#FFF7CC",
    fontSize: 16,
    fontWeight: "600",
  },
});
