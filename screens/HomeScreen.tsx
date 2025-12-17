import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <Button title="Work Notes" onPress={() => navigation.navigate('Notes', { category: 'Work' })} />
      <Button title="Study Notes" onPress={() => navigation.navigate('Notes', { category: 'Study' })} />
      <Button title="Personal Notes" onPress={() => navigation.navigate('Notes', { category: 'Personal' })} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:28, marginBottom:20 }
});

export default HomeScreen;
