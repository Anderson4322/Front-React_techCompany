import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api/api-config";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState();
  const [span, setSpan] = useState(false);
  const navigate = useNavigate();

  async function Logar() {
    try {
      const resposta = await api.post(`/usuarios/login`, {
        email,
        senha,
      });

      localStorage.setItem("nome", resposta.data.nome);
      localStorage.setItem("nivel", resposta.data.nivel);
      localStorage.setItem("id", resposta.data.id_usuario);
      localStorage.setItem("imagem", resposta.data.data);
      if (resposta.nivel == 3) {
        navigate("/Admin");
      } else {
        navigate("/", { replace: true });
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  function Verificar() {
    email == "" || senha == "" ? setSpan(true) : Logar();
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
            className="w-80 rounded-lg h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#8b4dff]/40"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            type="password"
            placeholder="Digite sua senha"
          />

          <button
            onClick={() => Verificar()}
            className="w-50 h-10 rounded-lg bg-linear-to-r from-[#8b4dff] to-[#7448ff] text-white hover:opacity-90 transition"
          >
            Logar
          </button>
        </div>
      </div>

      {span && (
        <div className=" fixed inset-0 z-50 bg-black/50 w-full flex justify-center items-center">
          <div className="bg-white shadow-xl rounded-2xl p-5">
            <button
              className="w-5 hover:scale-125 hover:bg-gray-50"
              onClick={() => setSpan(false)}
            >
              X
            </button>
            <h1>Ops Voce não completou corretamento os campos</h1>
            <p>Feche e complete os campos para login</p>
          </div>
        </div>
      )}
    </div>
  );
}
