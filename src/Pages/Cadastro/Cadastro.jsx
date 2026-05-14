import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../api/api-config";
function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  async function Cadastro() {
    try {
      const resposta = await api.post('/cadastro/user', {
        nome,
        email,
        senha,
        endereco,
      });

      if (resposta.status == 201) {
        alert("Cadastrado com sucesso");
        navigate("/Login");
      } else {
        alert("Cadastro inválido! Ou Email já cadastrado");
      }
    } catch (error) {
      alert("Cadastro inválido!");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-[#667eea] to-[#764ba2] py-8 px-4">
      <div className="flex w-full max-w-3xl bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* Lado das boas-vindas */}
        <div className="hidden md:flex w-1/2 bg-[#7c4dff] text-white flex-col justify-center items-center text-center p-10">
          <h1 className="text-[26px] mb-4 font-bold leading-snug">
            Bem-vindo(a) de volta!
          </h1>
          <p className="text-sm mb-8 leading-relaxed opacity-90">
            Para continuar conectado(a) conosco, faça login com suas informações
            pessoais.
          </p>
          <h1 className="border-2 border-white py-3 px-9 rounded-full font-bold no-underline text-white hover:bg-white hover:text-[#7c4dff] transition-colors">
            <Link to="/Login">ENTRAR</Link>
          </h1>
        </div>

        {/* Lado do cadastro */}
        <div className="w-1/2 overflow-y-auto max-h-[90vh]">
          <div className="p-8">
            <h1 className="text-2xl text-gray-800 mb-6 font-bold">
              Criar Conta
            </h1>

            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1 text-sm">
                Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:border-[#7c4dff] focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20 transition-all text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1 text-sm">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:border-[#7c4dff] focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20 transition-all text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1 text-sm">
                Endereço
              </label>
              <input
                type="text"
                placeholder="Digite seu endereço"
                required
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:border-[#7c4dff] focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20 transition-all text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-600 mb-1 text-sm">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:border-[#7c4dff] focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20 transition-all text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => Cadastro()}
              className="w-full py-3 bg-[#7c4dff] text-white border-none rounded-[10px] text-base font-bold cursor-pointer hover:bg-[#6a3de8] transition-colors"
            >
              CADASTRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
