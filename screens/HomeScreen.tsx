import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Categories</Text>
      <Text style={styles.subtitle}>Choose a note category</Text>

      {/* Category Cards */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Notes', { category: 'Work' })}
      >
        <Text style={styles.cardTitle}>Work Notes</Text>
        <Text style={styles.cardDesc}>Tasks, meetings & projects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Notes', { category: 'Study' })}
      >
        <Text style={styles.cardTitle}>Study Notes</Text>
        <Text style={styles.cardDesc}>Classes, assignments & exams</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Notes', { category: 'Personal' })}
      >
        <Text style={styles.cardTitle}>Personal Notes</Text>
        <Text style={styles.cardDesc}>Ideas, thoughts & reminders</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7CC',
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFD43B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  profileButton: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  profileText: {
    color: '#FFF7CC',
    fontSize: 16,
    fontWeight: '600',
  },
});
