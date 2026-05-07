import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavButton from "./components/NavButton/NavButton"

const HomePage = () => {
  const navigate = useNavigate();
  const [usuario] = useState(localStorage.getItem("nome"));
  const [nivel]= useState(localStorage.getItem("nivel"))

  const carregarLogout = () => {
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[url('/fundo.svg')] bg-cover bg-center bg-no-repeat bg-slate-900 flex flex-col">
      <header className="flex justify-between items-center p-3 w-full ">
        <div className="flex items-center gap-8">
          <img src="../public/logo.svg" alt="Tech Company" className="w-42.5 h-25" />

          <div className="flex gap-4">
            <NavButton onClick={() => navigate("/sobrenos")}>
            <Link to='/Sobre'> Sobre Nós</Link> 
            </NavButton>
            <NavButton onClick={() => navigate("/Concerto")}>
             <Link to="/Conserto">Ordens de Serviço</Link> 
            </NavButton>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h5 className="text-[#f4f4f4] font-bold text-[16px] mb-[3vh]">
            {nivel ==1 ? `Bem vindo usuário: ${usuario}`: nivel ==3? `Bem vindo Administrador: ${usuario}`: "Bem vindo visitante"}
          </h5>
          <h5>
            {nivel==3}
      <NavButton onClick={()=>navigate("/Admin")}>
        Painel administrativo
      </NavButton>
          </h5>

          <div className="flex gap-4">
            {!usuario ? (
              <>
                <NavButton pequeno onClick={() => navigate("/cadastro")}>
                 <Link to="/Cadastro">Cadastro</Link> 
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

