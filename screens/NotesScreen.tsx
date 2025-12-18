import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  dateAdded: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Notes">;

const NotesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params;
  const [notes, setNotes] = useState<Note[]>([]);

  // LOAD NOTES
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const allNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

      const filteredNotes = allNotes.filter(
        (note) => note.category === category
      );

      setNotes(filteredNotes);
    } catch (error) {
      console.log("Failed to load notes");
    }
  };

  // DELETE NOTE
  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedNotes = await AsyncStorage.getItem("notes");
              const allNotes: Note[] = storedNotes
                ? JSON.parse(storedNotes)
                : [];

              const updatedNotes = allNotes.filter(
                (note) => note.id !== noteId
              );

              await AsyncStorage.setItem(
                "notes",
                JSON.stringify(updatedNotes)
              );

              loadNotes();
            } catch (error) {
              Alert.alert("Error", "Failed to delete note");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadNotes);
    return unsubscribe;
  }, [navigation]);

  // EMPTY STATE COMPONENT
  const EmptyNotes = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../assets/register.png")}
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>No notes yet</Text>
      <Text style={styles.emptySubtitle}>
        Start by adding your first note
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyNotes />}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditNote", { noteId: item.id })
              }
            >
              <Text style={styles.noteTitle}>
                {item.title || "Untitled"}
              </Text>
              <Text style={styles.noteContent}>{item.content}</Text>
              <Text style={styles.date}>
                {new Date(item.dateAdded).toLocaleString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNote(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNote")}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC",
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  noteCard: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  noteContent: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#E63946",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  deleteText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: "#333",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF7CC",
    fontSize: 16,
    fontWeight: "600",
  },

  /* EMPTY STATE */
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
