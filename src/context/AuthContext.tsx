import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: string;
  isAuthenticated: boolean;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("@ss-user");
    if (loggedInUser) {
      const { id, token } = JSON.parse(loggedInUser);
      setUser(id);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      setUser("");
    }
  }, [router]);

<<<<<<< HEAD
  const signIn = async (credentials: SignInCredentials) => {
    try {
      const response = await api.post("login", credentials);
      const { token, userId } = response.data;
      console.log(userId);

      localStorage.setItem("@ss-user", JSON.stringify({ userId, token }));
      setCookie(undefined, "ssAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser(userId);
      router.push("/manager");
    } catch (err) {
      setUser("");
      console.error(err);
=======
  useEffect(() => {
    if (credentials) {
      const signIn = async () => {
        try {
          const response = await api.post("login", credentials);
          const { token, id, role } = response.data;

          localStorage.setItem("@ss-user", JSON.stringify({ id, token }));
          setCookie(undefined, "ssAuth.token", token, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });

          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          setUser(id);
          if (role === "MANAGER") {
            router.push("/manager");
          } else if (role === "EMPLOYEE") {
            router.push("/employee");
          }
        } catch (err) {
          setUser("");
          console.error(err);
        } finally {
          setCredentials(null);
        }
      };

      signIn();
>>>>>>> eefaa681c45cafb1040bc380046cb2ecd9299319
    }
  };

  const signOut = () => {
    destroyCookie(undefined, "ssAuth.token");
    localStorage.removeItem("@ss-user");
    setUser("");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated: !!user,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
