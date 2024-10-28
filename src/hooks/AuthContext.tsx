import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  secondName: string | null;
  photo: string | null;
};

type UserInfo = {
  token: string | null;
  user: User;
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

  const { data: userInfoJson } = useQuery({
    queryKey: ["user_info"],
    queryFn: () => AsyncStorage.getItem("user_info"),
  });

  useEffect(() => {
    if (userInfoJson) {
      const storedUserInfo: UserInfo = userInfoJson ? JSON.parse(userInfoJson) : null;
      setUserInfo(storedUserInfo);
    }
  }, [userInfoJson]);

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
    <AuthContext.Provider value={{ userInfo, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};
