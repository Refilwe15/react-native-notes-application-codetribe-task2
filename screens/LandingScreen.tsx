import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type LandingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, "Landing">;

type Props = {
  navigation: LandingScreenNavigationProp;
};

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
         <Text style={styles.title}>Notes Made Simple</Text>
      {/* Illustration */}
      <Image
        source={require("../assets/illustration.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text */}
     
      <Text style={styles.subtitle}>
        Organize your thoughts, tasks, and ideas in one place.
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.primaryText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.secondaryText}>I already have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CC", // soft yellow
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#FFD43B",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
  },
  primaryText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryText: {
    color: "#333",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
