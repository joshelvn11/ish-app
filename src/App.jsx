import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/core/Header";
import "@/api/axiosDefaults";
import LoginPage from "@/pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import { UiContextProvider } from "./context/UiContext";
import Navbar from "./components/core/Navbar";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="h-screen max-h-screen">
      <BrowserRouter>
        <UiContextProvider>
          <AuthProvider>
            <Header />
            <div className="flex flex-row w-full h-full">
              <Navbar></Navbar>
              <div id="page-content-wrapper" className="w-full h-full p-3">
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
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </div>
            </div>
          </AuthProvider>
        </UiContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
