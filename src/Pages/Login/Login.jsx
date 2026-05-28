import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api/api-config";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [span, setSpan] = useState(false);
  const[open,setOpen]= useState(false)
  const navigate = useNavigate();

  async function Logar() {
    try {
      const resposta = await api.post(`/usuarios/login`, {
        email,
        senha,
      });

      localStorage.setItem("nome", resposta.data.nome);
      localStorage.setItem("email", resposta.data.email);
      localStorage.setItem("nivel", resposta.data.nivel);
      localStorage.setItem("id", resposta.data.id_usuario);
      if (resposta.nivel === 3) {
        navigate("/Admin", { replace: true });
      } else {
        navigate("/")
      }
    } catch (erro) {
      setOpen(true)
    }
  }

  function Verificar() {
    if (email == "" || senha == "") {
      return alert("Preencha todos os campos!!");
    } else {
      Logar();
    }
  }

  function Login(){
    navigate("/", { replace: true });
  }

  return (
    <div>
      <div className="w-full bg-linear-to-r from-[#5f74d8] to-[#7b57b8] h-185 flex justify-center items-center">
        <div className="bg-linear-to-b from-[#8b4dff] to-[#7448ff] flex justify-center gap-3 text-white rounded-l-4xl flex-col items-center h-100 w-100 shadow-2xl">
          <h1 className="text-4xl font-semibold">Olá, amigo</h1>

          <p className="text-white/80 text-center px-6">
            Cadastre-se para começar a usar nossos serviços
          </p>

          <button className="w-40 h-12 rounded-2xl border border-white/70 hover:bg-white/10 transition">
            <Link to="/Cadastro">Cadastra-se</Link>
          </button>
        </div>

        <div className="bg-[#f4f4f4] p-6 w-100 rounded-r-4xl h-100 flex flex-col gap-4 justify-center items-center shadow-2xl">
          <h1 className="text-4xl font-bold text-[#1d2b45]">Login</h1>

          <label className="text-gray-700 self-start ml-10">Email:</label>

          <input
            className="w-80 rounded-lg h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#8b4dff]/40"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Digite seu email"
          />

          <label className="text-gray-700 self-start ml-10">Senha:</label>

          <input
            className={`w-80 rounded-lg h-10 px-3 border bg-white focus:outline-none focus:ring-2 transition-all
${
  senha.length < 8
    ? "border-red-500 focus:ring-red-500/40"
    : "border-gray-300 focus:ring-[#8b4dff]/40"
}`}
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            type="password"
            placeholder="Digite sua senha"
          />
          {senha.length < 8 ? (
            <div>Senha deve ter mais de 8 caracteres</div>
          ) : null}

          <button
            onClick={() => Verificar()}
            className="w-50 h-10 rounded-lg bg-linear-to-r from-[#8b4dff] to-[#7448ff] text-white hover:opacity-90 transition"
          >
            Logar
          </button>
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
          Email ou senha incorretos
        </h1>

        <p className="text-gray-500 text-sm">
          Verifique suas credenciais e tente novamente.
        </p>

        <button
          onClick={() => setOpen(false)}
          className="mt-2 bg-[#8b4dff] hover:bg-[#7a3fff] transition-all text-white font-medium px-6 py-2.5 rounded-xl"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}
