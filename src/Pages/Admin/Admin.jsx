import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { api } from "../../../api/api-config.js";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(0);
  const [endereco, setEndereco] = useState("");
  const [nivel, setNivel] = useState("");
  const [conta] = useState(localStorage.getItem("nome"))
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

    const [pedidos, setPedidos] = useState([]);
  const [imagem, setImagem] = useState("");

  async function buscarPedidos() {
    try {
      const resposta = await api.get(`/pedidos`);
      setPedidos(resposta.data);
      console.log("Pedido montado ou dado alterado");
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
      console.log("Usuario montado ou dado alterado");
    } catch (erro) {
      console.log(erro);
    }
  }
  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function CadastroUser() {
    const resposta = await api.post(`/admin/cadastro`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        endereco,
        nivel,
      }),
    });
    resposta.status == 200
      ? (alert("Cadastro concluido"), setUsuarios(...usuarios, {nome, email, senha, endereco, nivel}))
      : alert("Erro ao cadastrar");
  }
  function Login() {
    navigate("/login");
  }

  function Admin() {}

  return (
    <div>
      <header className="w-full h-15 bg-[#0d1aa6] text-white  ; flex items-center justify-between p-10">
        <h1>Painel Administrativo</h1>
        <h2>{conta}</h2>
        <button className=" w-15 rounded bg-white text-black hover:bg-gray-400">
          Home
        </button>
        <button
          className="w-40 h-7 rounded bg-white text-black hover:bg-gray-400"
          onClick={() => setOpen(true)}
        >
          Adicionar usuario ➕
        </button>
        <button
          className="w-25 bg-white text-black rounder hover:bg-[#0d1aa6] border text-white-500 transition"
          onClick={() => {
            Login();
          }}
        >
          Sair
        </button>
      </header>

      <div className={open ? "flex" : "hidden"}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className=" fixed z-30 w-100 h-125 ml-130 mt-10 flex justify-center gap-2 p-4 items-center flex-col bg-white shadow-lg bg-opacity-50 inset-0 rounded-2xl">
            <div className="w-full">
              <button
                onClick={() => setOpen(false)}
                className=" w-10 rounded-2xl  hover:scale-130 transition p-2"
              >
                ❌
              </button>
            </div>
            <legend>Nome:</legend>
            <input
              name="nome"
              type="text"
              className="border w-70 p-2"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do usuario"
            />
            <legend>Email:</legend>
            <input
              type="email"
              className="border w-70 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email do usuario"
            />
            <legend>Senha:</legend>
            <input
              type="text"
              className="border w-70 p-2"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha do Profissional ou Administrador"
            />
            <legend>Endereço:</legend>
            <input
              type="text"
              className="border w-70 p-2"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço do usuario"
            />
            <legend>Nivel:</legend>
            <input
              type="number"
              className=" border w-70 p-2"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              placeholder="(2) ou (3)"
              maxLength={1}
            />
            <button
              onClick={() => CadastroUser()}
              className="w-70 p-1 bg-[#0c1cca] rounded text-amber-50 "
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
          <div className="bg-[#EFF2FE]">
      <div className="w-full flex h-12 items-center justify-center">
        <h1 className=" text-2xl text-blue-800 ">Usuarios Cadastrados</h1>
      </div>
      <div className=" w-full  gap-2 flex justify-center items-center flex-wrap">
        <main className="w-full p-2 rounded-2xl flex gap-1">
          {usuarios.map((p) => (
            <div className="p-3 shadow-xl rounded-2xl w-1/6" key={p.id_usuario}>
              <p>{p.nome}</p>
              <p>{p.email}</p>
              <p>Nivel conta: {p.nivel}</p>
              <div className="flex gap-3 text-2xl">
                <MdModeEdit
                  className="bg-gray-400 hover:scale-125"
                  onClick={() => editar(p.id_usuario)}
                />
                <IoTrashOutline
                  className="bg-gray-400 hover:scale-125"
                  onClick={() => excluir(p.id_usuario)}
                />
              </div>
            </div>
          ))}
        </main>
      </div>

      <div className="w-full border h-12  flex justify-center items-center">
        <h1 className="text-2xl text-blue-800 ">Pedidos Solicitados</h1>
      </div>
      <div>
        
        <main className="w-full p-2 rounded-2xl flex gap-10 flex-wrap">
          {pedidos.map((p) => {
            const byteArray = new Uint8Array(p.data.data);
            const blob = new Blob([byteArray], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            return (
              <div
                className="  bg-white rounded-[18px] p-4 w-55 flex flex-col gap-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                key={p.id_pedido}
              >
                <img src={url} />
                <p className="self-start text-[12px] px-3 py-5px rounded-[20px] font-semibold bg-[#e3e8ff] text-[#3b4eff]">
                  {p.tipoeletronico}
                </p>

                <h3 className="text-[20px] font-semibold text-[#222] ">
                  {p.nome}
                </h3>

                <h5 className="text-[13px] text-[#777]">
                  Número de Contato: {p.telefone}
                </h5>

                <hr></hr>

                <h4 className="text-[15px] font-medium text-[#444] pt-5px border-t border-[#eee]">
                  {p.modelo}
                </h4>

                <p className="text-[14px] text-[#666] leading-[1.4]">
                  Descrição:{p.descricao}
                </p>

                <h3 className="mt-10px text-[18px] font-bold text-[#0d1aa6]">
                  Valor: R$ {p.valor}
                </h3>

                <p>{p.comentario}</p>
                <div className="flex gap-3 text-2xl"></div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
    </div>
  );
}
