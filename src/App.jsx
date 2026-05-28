import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavButton from "./components/NavButton/NavButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(localStorage.getItem("nome"));
  const [nivel, setNivel] = useState(localStorage.getItem("nivel"));
  const[open, setOpen]= useState(false)

  const carregarLogout = () => {
    localStorage.clear();
    setOpen(true)
  };
  const Login = ()=>{
     navigate("/login", {replace:true});
  }
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
                nivel ==2? `Bem vindo Profissional: ${usuario}`
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
      {open && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex flex-col items-center text-center gap-4">
        
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Sessão encerrada...
        </h1>

        <p className="text-gray-500 text-sm">
          Sua sessão foi finalizada com sucesso.
        </p>

        <button
          onClick={() => {setOpen(false); Login();}}
          className="mt-2 bg-[#8b4dff] hover:bg-[#7a3fff] transition-all text-white font-medium px-6 py-2.5 rounded-xl"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default HomePage;
