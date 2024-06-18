import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/core/Header";
import Test from "./components/core/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl p-3">
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
