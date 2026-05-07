import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Error from "./Pages/Error/Error.jsx"
import Login from "./Pages/Login/Login.jsx"
import Admin from "./Pages/Admin/Admin.jsx"
import Conserto from "./Pages/Conserto/Conserto.jsx"
import Cadastro from "./Pages/Cadastro/Cadastro.jsx"
import Sobrenos from "./Pages/Sobrenos/Sobrenos.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/Conserto" element={<Conserto/>}/>
      <Route path="/Cadastro" element={<Cadastro/>}/>
      <Route path="/Sobre" element={<Sobrenos/>}/>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
