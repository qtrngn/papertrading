import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
