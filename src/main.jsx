import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Error from "./Pages/Error/Error.jsx"
import Login from "./Pages/Login/Login.jsx"
import Home from "./Pages/Home/Home.jsx"
import Admin from "./Pages/Admin/Admin.jsx"
import Conserto from "./Pages/Conserto/Conserto.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/Conserto" element={<Conserto/>}/>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
