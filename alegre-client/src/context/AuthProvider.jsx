import { useCallback, useEffect, useMemo, useState } from "react";
import api, { TOKEN_KEY } from "../lib/api.js";
import AuthContext from "./authContext.js";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(
    // If there's an existing token on fresh load, start as loading
    () => !!sessionStorage.getItem(TOKEN_KEY)
  );

  const user = token ? authUser : null;

  useEffect(() => {
    if (!token) {
      setLoading(false); // Make sure loading stops if there's no token
      return;
    }

    let cancelled = false;

    const run = async () => {
      await Promise.resolve();
      if (cancelled) return;
      
      // Ensure loading is true when fetching user data
      setLoading(true);
      try {
        const { data } = await api.get("/auth/me");
        if (!cancelled) setAuthUser(data.user);
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setAuthUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback((newToken) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setAuthUser(null);
    // FIX: Set loading to true immediately so RequireAuth knows to wait for /auth/me
    setLoading(true); 
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAuthUser(null);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, token, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}