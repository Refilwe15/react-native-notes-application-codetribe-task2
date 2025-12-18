import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Illustration */}
      <Image
        source={require('../assets/register.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Headings */}
      <Text style={styles.welcome}>Welcome back.</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.primaryText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Footer */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.link}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7CC',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 25,
  },
  welcome: {
    color: '#333',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#555',
    fontSize: 18,
    marginBottom: 35,
  },
  inputGroup: {
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFD43B',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: '#FFD43B',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
  },
  primaryText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: '#333',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
