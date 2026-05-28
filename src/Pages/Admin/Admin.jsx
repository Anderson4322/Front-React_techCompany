import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";

import { api } from "../../../api/api-config.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openSair, setOpenSair] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(0);
  const [endereco, setEndereco] = useState("");
  const [nivel, setNivel] = useState("");
  const [perfil, setPerfil] = useState(localStorage.getItem("nome"));

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  async function buscarPedidos() {
    try {
      const resposta = await api.get(`/pedidos`);
      setPedidos(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarPedidos();
  }, []);

  async function buscarUsuarios() {
    try {
      const resposta = await api.get(`/usuarios`);
      setUsuarios(resposta.data);
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function CadastroUser() {
    try {
      const resposta = await api.post(`/admin/cadastro`, {
        nome,
        email,
        senha,
        endereco,
      });

      if (resposta.status === 200) {
        alert("Cadastro concluído");

        setUsuarios([
          ...usuarios,
          { nome, email, senha, endereco},
        ]);

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar");
    }
  }

  function Sair() {
    localStorage.clear();
   setOpenSair(true)
   
  }
  function Login(){
    navigate("/login", {replace:true});
  }

  function Home() {
    navigate("/");
  }

  async function ExcluirPedido(id) {
    try {
      const resposta = await api.delete(`deletar_pedido/${id}`);

      if (resposta.status === 200) {
        alert("Pedido deletado com sucesso!");

        setPedidos(
          pedidos.filter((pedido) => pedido.id_pedido !== id)
        );
      } else {
        alert("Erro ao deletar pedido!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function ExcluirUser(id) {
    try {
      const resposta = await api.delete(`deletar_user/${id}`);

      if (resposta.status === 200) {
        alert("Usuário deletado!");

        setUsuarios(
          usuarios.filter((usuario) => usuario.id_usuario !== id)
        );
      } else {
        alert("Erro ao deletar usuário!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* HEADER */}
      <header className="w-full bg-[#0d1aa6] text-white flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        <h1 className="text-xl font-bold text-center">
          Painel Administrativo
        </h1>

        <h2 className="text-center text-sm md:text-base">
          {!perfil
            ? "Bem vindo visitante"
            : `Bem vindo administrador: ${perfil}`}
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={Home}
            className="px-4 py-1 rounded bg-white text-black hover:bg-gray-300 transition"
          >
            Home
          </button>

          <button
            className="px-4 py-1 rounded bg-white text-black hover:bg-gray-300 transition"
            onClick={() => setOpen(true)}
          >
            Adicionar usuário ➕
          </button>

          <button
            className="px-4 py-1 rounded bg-white text-black hover:bg-red-500 hover:text-white transition"
            onClick={Sair}
          >
            Sair
          </button>
        </div>
      </header>

     {/* MODAL */}
{open && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3">
    <div className="bg-[#111827] border border-[#374151] rounded-2xl p-5 w-1/3 h-150 overflow-y-auto shadow-2xl flex flex-col gap-3">
      
      <div className="w-full flex justify-end">
        <button
          onClick={() => setOpen(false)}
          className="text-red-400 hover:text-red-500 text-xl hover:scale-125 transition"
        >
          ❌
        </button>
      </div>

      <legend className="text-gray-200 font-medium">
        Nome:
      </legend>

      <input
        type="text"
        className="border border-[#374151] bg-[#1F2937] text-white placeholder:text-gray-400 w-full p-2 rounded outline-none focus:border-[#3B82F6]"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite o nome do usuário"
      />

      <legend className="text-gray-200 font-medium">
        Email:
      </legend>

      <input
        type="email"
        className="border border-[#374151] bg-[#1F2937] text-white placeholder:text-gray-400 w-full p-2 rounded outline-none focus:border-[#3B82F6]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite o email do usuário"
      />

      <legend className="text-gray-200 font-medium">
        Senha:
      </legend>

      <input
        type="text"
        className="border border-[#374151] bg-[#1F2937] text-white placeholder:text-gray-400 w-full p-2 rounded outline-none focus:border-[#3B82F6]"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite a senha"
      />

      <legend className="text-gray-200 font-medium">
        Endereço:
      </legend>

      <input
        type="text"
        className="border border-[#374151] bg-[#1F2937] text-white placeholder:text-gray-400 w-full p-2 rounded outline-none focus:border-[#3B82F6]"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        placeholder="Digite o endereço"
      />

      <legend className="text-gray-200 font-medium">
        Nível:
      </legend>

      <input
        type="number"
        className="border border-[#374151] bg-[#1F2937] text-white placeholder:text-gray-400 w-full p-2 rounded outline-none focus:border-[#3B82F6]"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        placeholder="(2) ou (3)"
      />

      <button
        onClick={CadastroUser}
        className="w-full p-2 bg-[#2563EB] rounded text-white font-semibold hover:bg-[#1D4ED8] transition"
      >
        Confirmar
      </button>
    </div>
  </div>
)}
      {/* USUÁRIOS */}
      <div className="bg-[#EFF2FE] min-h-screen">
        <div className="w-full h-14 flex items-center justify-center">
          <h1 className="text-2xl text-blue-800 font-bold">
            Usuários Cadastrados
          </h1>
        </div>

        <main className="w-full p-3 flex flex-wrap justify-center gap-4">
          {usuarios.map((p) => (
            <div
              className="bg-white p-4 shadow-xl rounded-2xl w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
              key={p.id_usuario}
            >
              <p className="font-semibold">{p.nome}</p>

              <p className="`break-words`">{p.email}</p>

              <p>Nível conta: {p.nivel}</p>

              <div className="flex gap-5 text-2xl mt-3">
                <IoTrashBinOutline
                  className="hover:scale-125 cursor-pointer transition"
                  onClick={() => ExcluirUser(p.id_usuario)}
                />
              </div>
            </div>
          ))}
        </main>

        {/* PEDIDOS */}
        <div className="w-full h-14 flex justify-center items-center">
          <h1 className="text-2xl text-blue-800 font-bold">
            Pedidos Solicitados
          </h1>
        </div>

        <main className="w-full p-4 flex gap-5 flex-wrap justify-center">
          {pedidos.map((p) => {
            const byteArray = new Uint8Array(p.data.data);

            const blob = new Blob([byteArray], {
              type: "image/png",
            });

            const url = URL.createObjectURL(blob);

            return (
              <div
                className="bg-white rounded-2xl p-4 w-full sm:w-[320px] flex flex-col gap-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                key={p.id_pedido}
              >
                <img
                  src={url}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <p className="self-start text-xs px-3 py-1 rounded-2xl font-semibold bg-[#e3e8ff] text-[#3b4eff]">
                  {p.tipoeletronico}
                </p>

                <h3 className="text-xl font-semibold text-[#222]">
                  {p.nome}
                </h3>

                <h5 className="text-sm text-[#777]">
                  Número de Contato: {p.telefone}
                </h5>

                <hr />

                <h4 className="text-[15px] font-medium text-[#444]">
                  {p.modelo}
                </h4>

                <p className="text-sm text-[#666] `break-words`">
                  Descrição: {p.descricao}
                </p>

                <h3 className="text-lg font-bold text-[#0d1aa6]">
                  Valor: R$ {p.valor}
                </h3>

                <p>{p.comentario}</p>

                <div className="flex gap-3 text-2xl mt-2">
                  <IoTrashBinOutline
                    className="hover:scale-125 cursor-pointer transition"
                    onClick={() => ExcluirPedido(p.id_pedido)}
                  />
                </div>
              </div>
            );
          })}
           {openSair && (
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
        </main>
      </div>
    </div>
  );
}