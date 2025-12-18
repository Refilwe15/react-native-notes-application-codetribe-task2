import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // LOAD USER DETAILS
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      setEmail(user.email);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    navigation.replace("Login");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.primaryText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC",
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#FFD43B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryText: {
    color: "#FFF7CC",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});
