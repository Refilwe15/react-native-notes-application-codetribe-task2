import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const user = { username, email, password };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Success", "Account created successfully");
      navigation.replace("Login"); // ✅ Go to Login
    } catch (error) {
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Image
        source={require("../assets/register.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>Welcome.</Text>
      <Text style={styles.subtitle}>
        Create your account to access our features.
      </Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
        <Text style={styles.createText}>CREATE</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  image: { width: "100%", height: 180, marginBottom: 25 },
  welcome: { fontSize: 32, fontWeight: "700", color: "#333" },
  subtitle: { fontSize: 18, color: "#555", marginBottom: 35 },
  inputGroup: { marginBottom: 40 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFD43B",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 25,
  },
  createButton: {
    backgroundColor: "#FFD43B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 25,
  },
  createText: { fontSize: 16, fontWeight: "700", color: "#333" },
  footerText: { textAlign: "center", color: "#555" },
  link: { fontWeight: "600", textDecorationLine: "underline" },
});
