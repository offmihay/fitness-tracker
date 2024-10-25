import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type UserInfo = {
  username: string;
  token: string;
  role: string;
};

type AuthContextType = {
  userInfo: UserInfo | null;
  logIn: (newInfo: UserInfo) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("user_info");
        storedUserInfo && setUserInfo(JSON.parse(storedUserInfo));
      } catch (e) {
        console.log("Failed to load user_info from storage");
      }
    };
    loadUserInfo();
  }, []);

  const logIn = async (newInfo: UserInfo) => {
    setUserInfo(newInfo);
    try {
      await AsyncStorage.setItem("user_info", JSON.stringify(newInfo));
    } catch (e) {
      console.error("Failed to save user_info in storage", e);
    }
  };

  const logOut = async () => {
    setUserInfo(null);
    try {
      await AsyncStorage.removeItem("user_info");
    } catch (e) {
      console.error("Failed to remove user_info from storage", e);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
