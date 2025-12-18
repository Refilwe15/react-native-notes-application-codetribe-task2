import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (user: User) => {
  const existing = await AsyncStorage.getItem("user");

  if (existing) {
    throw new Error("User already exists");
  }

  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const loginUser = async (email: string, password: string) => {
  const storedUser = await AsyncStorage.getItem("user");

  if (!storedUser) {
    throw new Error("No user found");
  }

  const user: User = JSON.parse(storedUser);

  if (user.email !== email || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  await AsyncStorage.setItem("isLoggedIn", "true");
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("isLoggedIn");
};
