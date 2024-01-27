import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: false,
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setisLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthUser = async () => {
    try {
      const { $id, name, username, email, imageUrl, bio } =
        await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.username,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setisLoading(false);
    }
  };
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    chekckAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;