import useAuth from "./hooks/useAuth";

import Loader from "./components/ui/Loader";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return <AppRoutes />;
}

export default App;
