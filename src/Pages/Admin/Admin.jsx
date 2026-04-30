import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(0);
  const [endereco, setEndereco] = useState("");
  const [nivel, setNivel] = useState("");
  const [conta, setConta] = useState();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await axios.get("http://localhost:3000/usuarios");
        setUsuarios(resposta.data);
        console.log("Componente montado ou dado alterado");
      } catch (erro) {
        console.log(erro);
      }
    }

    buscarUsuarios();
  }, []);

  async function CadastroUser() {
    const resposta = await fetch("http://localhost/admin/cadastro", {
      method: "POST",
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
      ? alert("Cadastro concluido")
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

      <div className="w-full flex h-12 items-center justify-center">
        <h1 className=" text-2xl text-blue-800 ">Usuarios Cadastrados</h1>
      </div>
      <div className="m-1 w-full  gap-2 flex justify-center items-center flex-wrap">
        <main className="w-full p-2 rounded-2xl flex gap-1">
          {usuarios.map((p) => (
            <div className="p-3  w-1/6" key={p.id_usuario}>
              <p>{p.nome}</p>
              <p>{p.email}</p>
              <p>Nivel conta: {p.nivel}</p>
              <div className="flex gap-3 text-2xl">

              <MdModeEdit className="bg-gray-400 hover:scale-125" onClick={() => editar(p.id_usuario)} />
              <IoTrashOutline className="bg-gray-400 hover:scale-125" onClick={()=> excluir(p.id_usuario)} />
              </div>
            </div>
          ))}
        </main>
      </div>

      <div className="w-full border h-12  flex justify-center items-center">
        <h1 className="text-2xl text-blue-800 ">Pedidos Solicitados</h1>
      </div>
      <div>
        <main>Os</main>
      </div>
    </div>
  );
}
