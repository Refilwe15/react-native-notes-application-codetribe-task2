import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddNoteScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('Work');

  const handleSave = () => {
    Alert.alert('Note Saved', `Title: ${title}\nCategory: ${category}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Note</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Content"
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Personal" value="Personal" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7CC', // soft yellow background
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFD43B', // bright yellow card
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333', // dark text for readability
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFD43B', // match input cards
    borderRadius: 16,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333', // dark text in picker
  },
  saveButton: {
    backgroundColor: '#333', // dark button like HomeScreen profile/add button
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFF7CC', // soft yellow text
    fontSize: 16,
    fontWeight: '600',
  },
});
