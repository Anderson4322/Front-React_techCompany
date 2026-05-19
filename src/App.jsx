import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavButton from "./components/NavButton/NavButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(localStorage.getItem("nome"));
  const [nivel, setNivel] = useState(localStorage.getItem("nivel"));

  const carregarLogout = () => {
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");
    navigate("/login", {replace:true});
  };
  function SobreNos() {
    navigate("/Sobre");
  }
  function Ordens() {
    navigate("/Conserto");
  }

  return (
    <div className="min-h-screen bg-[url('/fundo.svg')] bg-cover bg-center bg-no-repeat bg-slate-900 flex flex-col">
      <header className="flex justify-between items-center p-3 w-full ">
        <div className="flex items-center gap-8">
          <img
            src="../public/logo.svg"
            alt="Tech Company"
            className="w-42.5 h-25"
          />

          <div className="flex gap-4">
            <NavButton onClick={() => SobreNos()}>Sobre Nós</NavButton>
            <NavButton onClick={() => Ordens()}>Ordens de Serviço</NavButton>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h5 className="text-[#f4f4f4] font-bold text-[16px] mb-[3vh]">
            {nivel == 1
              ? `Bem vindo usuário: ${usuario}`
              : nivel == 3
                ? `Bem vindo Administrador: ${usuario}`:
                nivel ==2? `Bem vindo profissional: ${usuario}`
                : "Bem vindo visitante"
                }
          </h5>

          <div className="flex">
            {nivel == 1 ? null : nivel == 3 ? (
              <NavButton onClick={() => navigate("/Admin")}>
                Painel administrativo
              </NavButton>
            ) : null}
          </div>

          <div className="flex gap-4">
            {!usuario ? (
              <>
                <NavButton pequeno onClick={() => navigate("/Cadastro")}>
                  Cadastro
                </NavButton>
                <NavButton pequeno onClick={() => navigate("/Login")}>
                  Login
                </NavButton>
              </>
            ) : (
              <NavButton onClick={()=>carregarLogout()}>Sair</NavButton>
            )}
          </div>
          
        </div>
      </header>
    </div>
  );
};

export default HomePage;
