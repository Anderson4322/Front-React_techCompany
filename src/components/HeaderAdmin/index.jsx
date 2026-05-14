import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [imagem, setImagem] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  function AbrirMenu() {
    setMenuAberto(!menuAberto);
  }

  function sair() {
    localStorage.removeItem("token");
    navigate("/logout");
  }
  function limpar() {
    setEmail("");
    setNome("");
    setEndereco("");
    setTelefone("");
    setMsg("");
  }
  async function AtualizarPerfil() {
    if (resposta.status == 200) {
      limpar();
      navigate("/"); ///retornar para mesma pasgina
    }
  }

  function trocar() {
    nome == "" || email == "" || endereco == "" || telefone == ""
      ? (setMsg("Preencha todos os Campos!!!!"), limpar())
      : AtualizarPerfil();
  }
  return (
    <header className="items-center justify-between bg-[#0d1aa6] min-w-5xl hidden px-6 h-25 w-full shadow-[0_4px_20px_rgba(0,0,0,0.2)]  top-0 z-1000 text-white">
      <img src="/Logo.svg" className="h-12 object-contain" />

      <div className="flex gap-6 text-lg">
        <Link to="/sobrenos" className="hover:underline">
          Sobre Nós
        </Link>
        <Link to="/conserto" className="hover:underline">
          Conserto
        </Link>
        <Link to="/" className="hover:underline">
          HomePage
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <img
          src="/perfil.jpg"
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
        />
        <button onClick={AbrirMenu} className="cursor-pointer">
          <img src="/menu.svg" className="h-6" alt="Menu" />
        </button>
      </div>

      {menuAberto && (
        <div className="absolute right-4 top-16 bg-white text-black p-4 rounded shadow-lg flex flex-col gap-4 w-48">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            {" "}
            Perfil
          </button>
          <button
            onClick={sair}
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white  rounded-lg flex flex-col gap-4 w-1/2 h-">
            <div className="bg-[#0b1fa3] p-3 rounded-t-lg text-white text-center  ">
              <h2 className="text-xl mb-4">Atualizar Perfil</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mt-3">
                <p className=" text-xl mb-4 text-red-700"> {msg}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Imagem</label>
                <input
                  type="file"
                  onChange={(e) => setImagem(e.target.files[0])}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Nome:</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Endereço:</label>
                <input
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full border border-black rounded p-2 text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black font-medium">Telefone:</label>
                <input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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
                  onClick={trocar}
                  className="px-4 py-2 bg-[#0d1aa6] text-white rounded"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
