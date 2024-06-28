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
import { ProjectContextProvider } from "./context/ProjectContext";
import BacklogPage from "./pages/BacklogPage";

function App() {
  return (
    <div className="h-screen max-h-screen">
      <BrowserRouter>
        <UiContextProvider>
          <AuthProvider>
            <ProjectContextProvider>
              <Header />
              <div
                id="page-container"
                className="relative flex flex-row w-full max-h-[calc(100vh-61px)] h-full overflow-hidden"
              >
                <Navbar></Navbar>
                <div
                  id="page-content-wrapper"
                  className="w-full max-h-full p-3 overflow-y-auto"
                >
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/backlog"
                      element={
                        <PrivateRoute>
                          <BacklogPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                  </Routes>
                </div>
              </div>
            </ProjectContextProvider>
          </AuthProvider>
        </UiContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
