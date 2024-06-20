import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/core/Header";
import "@/api/axiosDefaults";
import LoginPage from "@/pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./components/core/Navbar";

function App() {
  return (
    <div className="h-screen max-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <div className="flex flex-row w-full h-full">
            <Navbar></Navbar>
            <div className="p-3">
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
