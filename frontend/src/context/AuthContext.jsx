import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "maison_tunis_user";

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Persist to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    // Simulate async API call
    await new Promise((r) => setTimeout(r, 900));
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return false;
    }
    if (password.length < 6) {
      setError("Mot de passe incorrect.");
      setLoading(false);
      return false;
    }
    const name = email.split("@")[0];
    setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) });
    setLoading(false);
    return true;
  }, []);

  const register = useCallback(async ({ email, password, name }) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 900));
    if (!email || !password || !name) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return false;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setLoading(false);
      return false;
    }
    setUser({ email, name });
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
