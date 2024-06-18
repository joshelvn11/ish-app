import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/core/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
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
