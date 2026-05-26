import { Link, RouterProvider, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { api } from "../../../api/api-config";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [conta, setConta] = useState(localStorage.getItem("nome"));
  const [open, setOpen] = useState(false);
  const nivel = localStorage.getItem("nivel");
  const [perfil, setPerfil] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const id = localStorage.getItem("id");
  const [imagem, setImagem] = useState(null);
  const [msg, setMsg] = useState("");
  const [openAtualiza, setOpenAtualiza] = useState(false);
  

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  function AbrirMenu() {
    setMenuAberto(!menuAberto);
  }

  function sair() {
    localStorage.clear();
    alert("Saindo..");
    navigate("/login");
  }

  function limpar() {
    setEmail("");
    setNome("");
    setEndereco("");
    setSenha("");
    setImagem(null);
    setMsg("");
  }

  async function ReceberDados() {
    try {
      const { data }= await api.get(`/usuarios/${id}`);
  
      setNome(data.nome);
      setEmail(data.email);
      setEndereco(data.endereco);
      setSenha(data.senha);
      console.log(data)
      setOpen(true);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  }

  async function AtualizarPerfil() {
    ReceberDados();

    try {
      const resposta = await api.put(`/alt_user/${id}`, {
        nome: prompt("Digite o valor", nome),
        email,
        senha,
        endereco,
      });
      console.log(id);

      if (resposta.status == 201) {
        setOpenAtualiza(true);
        localStorage.clear();
      } else {
        return alert("algo deu errado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Login() {
    navigate("/Login");
  }

  async function ImagemPer() {
    const formData = new FormData();

    formData.append("imagem", imagem);
    formData.append("id", id);
    if (!imagem) {
      return alert("Selecione uma imagem");
    }
    try {
      const resposta = await api.put(`/imagem/${id}`, formData);
      if (resposta.status == 201) {
        alert("Perfil atualizado!");
        return window.location.reload();
      } else {
        alert("Erro ao atualizar perfil");
      }
    } catch (error) {
      alert("Erro inesperado");
      console.log(error);
    }
  }

  async function ImagemPerfil() {
    try {
      const resposta = await api.get(`/imagem/${id}`);

      return resposta.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ImagemPerfil().then((i) => {
      const byteArray = new Uint8Array(i.data || imagem);
      const blob = new Blob([byteArray], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImagem(url);
    });
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#0d1aa6] px-6 h-25 w-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] text-white">
      <img src="../public/logo.svg" className="h-12 object-contain" />

      <div className="flex gap-6 text-lg">
        <button onClick={() => navigate("/Sobre")} className="hover:underline">
          Sobre Nós
        </button>

        <button
          onClick={() => navigate("/Conserto")}
          className="hover:underline"
        >
          Conserto
        </button>

        <button onClick={() => navigate("/")} className="hover:underline">
          HomePage
        </button>
      </div>

      <div className="flex items-center gap-4">
        <h5>
          {nivel == 2
            ? `Bem vindo Profissional: ${conta}`
            : "Bem vindo usuario: " + conta}
        </h5>
        <img
          onClick={() => setPerfil(true)}
          src={imagem}
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
        />

        {perfil && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen ">
            <div className="w-180 rounded-2xl shadow-xl/30 h-70 border-2 bg-white p-4">
              <button
                onClick={() => setPerfil(false)}
                className="w-15 rounded-4xl h-10 bg-red-500 hover:bg-red-700"
              >
                X
              </button>
              <div className="w-full flex flex-col justify-center gap-5 items-center p-2 ">
                <label className="text-black  font-medium">Imagem</label>
                <input
                  type="file"
                  onChange={(e) => setImagem(e.target.files[0])}
                  className="w-full border border-black rounded p-2 text-black"
                />
                <button
                  onClick={() => ImagemPer()}
                  className="w-50 h-10 bg-blue-600 text-white rounded hover:bg-[#0d1aa6]"
                >
                  Atualizar foto
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={AbrirMenu} className="cursor-pointer">
          <img src="/menu.svg" className="h-6" alt="Menu" />
        </button>
      </div>

      {menuAberto && (
        <div className="absolute right-4 top-16 bg-white text-black p-4 rounded shadow-lg flex flex-col gap-4 w-48">
          <button
            onClick={() => {
              ReceberDados();
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            Perfil
          </button>

          <button
            onClick={() => sair()}
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg flex flex-col gap-4 w-1/2">
            <div className="bg-[#0b1fa3] p-3 rounded-t-lg text-white text-center">
              <h2 className="text-xl mb-4">Atualizar Perfil</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mt-3">
                <p className="text-xl mb-4 text-red-700">{msg}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Nome:</label>

                <input
                  value={nome}
                  type="text"
                  required
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Email:</label>

                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Endereço:</label>

                <input
                  value={endereco}
                  type="text"
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Senha:</label>

                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => {
                    limpar();
                    setOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded text-black"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => AtualizarPerfil(id)}
                  className="px-4 py-2 bg-[#0d1aa6] text-white rounded"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALERTA DE PERFIL ATUALIZADO */}
      {openAtualiza && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen p-4 z-50">
          <div className="w-[95%] max-w-2xl rounded-2xl shadow-xl border-2 bg-white p-4 md:p-6">
            <button
              onClick={() => Login()}
              className="w-12 h-10 rounded-4xl bg-red-500 hover:bg-red-700 text-white transition"
            >
              X
            </button>

            <p className="text-xl md:text-3xl text-blue-700 mt-4">
              Suas informações foram atualizadas, relogue para receber suas
              informações
            </p>

            <p className="text-center mt-4 text-gray-600">
              Feche para ser direcionado ao login
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
