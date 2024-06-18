import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/core/Header";
import "@/api/axiosDefaults";
import LoginPage from "@/pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <div className="w-full h-full flex justify-center">
            <div className="w-full max-w-7xl h-full p-3">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
