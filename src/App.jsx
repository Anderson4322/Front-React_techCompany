import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "./components/NavButton/NavButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [usuario] = useState(localStorage.getItem("nome"));

  const carregarLogout = () => {
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[url('../public/fundo.svg')] bg-cover bg-center bg-no-repeat bg-slate-900 flex flex-col">
      <header className="flex justify-between items-center p-3 w-full ">
        <div className="flex items-center gap-8">
          <img src="../public/logo.svg" alt="Tech Company" className="w-42.5 h-25" />

          <div className="flex gap-4">
            <NavButton onClick={() => navigate("/sobrenos")}>
              Sobre Nós
            </NavButton>
            <NavButton onClick={() => navigate("/Concerto")}>
              Ordens de Serviço
            </NavButton>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h5 className="text-[#f4f4f4] font-bold text-[16px] mb-[3vh]">
            {usuario ? `Bem vindo usuário: ${usuario}` : "Bem-vindo, visitante"}
          </h5>

          <div className="flex gap-4">
            {!usuario ? (
              <>
                <NavButton pequeno onClick={() => navigate("/cadastro")}>
                  Cadastro
                </NavButton>
                <NavButton pequeno onClick={() => navigate("/login")}>
                  Login
                </NavButton>
              </>
            ) : (
              <NavButton onClick={carregarLogout}>Sair</NavButton>
            )}
          </div>
        </div>
      </header>

      
    </div>
  );
};

export default HomePage;

