import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Notes'>;

const NotesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params;
  const notes = [
    { id: '1', title: 'Note 1', content: 'This is a sample note' },
    { id: '2', title: 'Note 2', content: 'Another example note' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Notes</Text>
      <Button title="Add Note" onPress={() => navigation.navigate('AddNote')} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditNote', { noteId: item.id })} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:28, marginBottom:15 },
  noteCard: { padding:15, marginVertical:10, borderWidth:1, borderColor:'#ccc', borderRadius:8 },
  noteTitle: { fontWeight:'bold', marginBottom:5 },
});

export default NotesScreen;
