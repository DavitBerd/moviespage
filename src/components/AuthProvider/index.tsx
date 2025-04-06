import { createContext, ReactNode, useState } from "react";

export type User = {
  email: string;
  password: string;
  isAuth: boolean;
};

export const AuthContext = createContext<{
  isAuth: boolean;
  updateFn: (() => void) | undefined;
}>({
  isAuth: false,
  updateFn: undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuthUpdate = () => {
    setIsAuth((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAuth, updateFn: handleAuthUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
