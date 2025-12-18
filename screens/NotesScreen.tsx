import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Notes'>;

const NotesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params;
  const notes = [
    { id: '1', title: 'Meeting Notes', content: 'Discussed project deadlines and tasks.' },
    { id: '2', title: 'Ideas', content: 'Brainstormed new app features and UI improvements.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote')}
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
    backgroundColor: '#FFF7CC', // match HomeScreen
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  noteCard: {
    backgroundColor: '#FFD43B', // bright yellow card
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF7CC',
    fontSize: 16,
    fontWeight: '600',
  },
});
