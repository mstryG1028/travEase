import { createContext, useEffect, useState } from "react";

import * as authService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await authService.getCurrentUser();

      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(values) {
    await authService.login(values);

    const response = await authService.getCurrentUser();

    setUser(response.data.data);

    return response.data.data;
  }

  async function register(values) {
    await authService.register(values);

    const response = await authService.getCurrentUser();

    setUser(response.data.data);

    return response.data.data;
  }

  async function logout() {
    await authService.logout();

    setUser(null);
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
