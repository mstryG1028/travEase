import { useEffect } from "react";

import useAuth from "./hooks/useAuth";

import Loader from "./components/ui/Loader";
import AppRoutes from "./routes/AppRoutes";

import socket from "./socket/socket";

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      socket.disconnect();
      return;
    }

    // Prevent duplicate connections
    if (!socket.connected) {
      socket.connect();
    }

    // Register logged-in user
    socket.emit("join", user._id);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return <AppRoutes />;
}

export default App;
