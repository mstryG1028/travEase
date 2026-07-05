import { useEffect } from "react";

import useAuth from "./hooks/useAuth";

import Loader from "./components/ui/Loader";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
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

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-center"
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            width: "90vw",
            maxWidth: "480px",
            padding: "16px 20px",
            fontSize: "15px",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}

export default App;
