import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { AuthProvider } from "./components/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
