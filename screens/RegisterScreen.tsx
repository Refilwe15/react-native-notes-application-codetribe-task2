import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Illustration */}
      <Image
        source={require("../assets/register.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Headings */}
      <Text style={styles.welcome}>Welcome.</Text>
      <Text style={styles.subtitle}>
        Create your account to access our features.
      </Text>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#777"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

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

      {/* Create Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.createText}>CREATE</Text>
      </TouchableOpacity>

      {/* Footer */}
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
  image: {
    width: "100%",
    height: 180,
    marginBottom: 25,
  },
  welcome: {
    color: "#333",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#555",
    fontSize: 18,
    marginBottom: 35,
  },
  inputGroup: {
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFD43B",
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 25,
  },
  createButton: {
    backgroundColor: "#FFD43B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 25,
  },
  createText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  footerText: {
    color: "#555",
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    color: "#333",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
