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

type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, "Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        Alert.alert("Error", "No account found");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.email === email && user.password === password) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.replace("Home"); // ✅ Go to Home
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed");
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

      <Text style={styles.welcome}>Welcome back.</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.inputGroup}>
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

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
  primaryButton: {
    backgroundColor: "#FFD43B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 25,
  },
  primaryText: { fontSize: 16, fontWeight: "700", color: "#333" },
  footerText: { textAlign: "center", color: "#555" },
  link: { fontWeight: "600", textDecorationLine: "underline" },
});
