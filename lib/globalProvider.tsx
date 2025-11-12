import { createContext, useContext } from "react";
import { ReactNode } from "react";

import { getUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GloablContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GloablContextType | undefined>(undefined);

export const GloablProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });
  const isLoggedIn = !!user;
  console.log(JSON.stringify(user, null, 2));
  return (
    <GlobalContext.Provider value={{ isLoggedIn, loading, refetch, user }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const userGlobalContext = (): GloablContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used with in a GloablProvider.");
  }
  return context;
};

export default GloablProvider;