import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [initializing, setInitializing] = useState(true); // 初回のセッション確認中
  const [submitting, setSubmitting] = useState(false); // ログイン/登録フォーム送信中

  // 起動時に Cookie の有効な accessToken があるか確認する
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const { data } = await api.get("/auth/me");

        if (!cancelled) {
          setUser(data.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.log("inside authContext", err.message);
          setUser(null);
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data.data);
      return data;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data.data);
      return data;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    initializing,
    submitting,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth はAuthProviderの内側で使用してください。");
  }

  return ctx;
}
