import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Username: Refilwe</Text>
      <Text>Email: refilwemokoena@email.com</Text>
      <Button title="Edit Profile" onPress={() => alert('UI Only')} />
      <Button title="Logout" onPress={() => alert('UI Only')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:28, marginBottom:15 },
});

export default ProfileScreen;
