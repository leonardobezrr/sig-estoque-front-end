import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): void;
  user: string;
  isAuthenticated: boolean;
  signOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState("");
  const [credentials, setCredentials] = useState<SignInCredentials | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("@ss-user");
    if (loggedInUser) {
      const { userId, token } = JSON.parse(loggedInUser);
      setUser(userId);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      setUser("");
    }
  }, [router]);

  useEffect(() => {
    if (credentials) {
      const signIn = async () => {
        try {
          const response = await api.post('login', credentials);
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
        } finally {
          setCredentials(null);
        }
      };

      signIn();
    }
  }, [credentials, router]);

  function signIn(credentials: SignInCredentials) {
    setCredentials(credentials);
  }

  function signOut() {
    destroyCookie(undefined, "ssAuth.token");
    localStorage.removeItem("@ss-user");
    setUser("");
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
