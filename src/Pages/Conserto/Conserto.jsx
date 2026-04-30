import { useState } from "react";
import Header from "../components/Header/index.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDes] = useState("");
  const [tipoeletronico, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");

  function trocar() {
    nome == "" || descricao== "" || tipoeletronico == "" || modelo == "" || telefone == ""
      ? setMsg("Preencha todos os Campos!!!!")
      : cadastrar();
  }
 function limpar() {
    setModelo("");
    setDes("");
    setTipo("");
    setTelefone("");
    setMsg("");
    setNome("");
    
  }

  async function cadastrar() {
    const resposta = await fetch("http://192.168.1.23:3000/cad_pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        nome: nome,
        descricao: descricao,
        tipoeletronico: tipoeletronico,
        modelo: modelo,
        telefone: telefone,
      }),
    });
    if (resposta.status == 201) {
      return window.location.reload();
    } else {
      alert("Erro ao cadastro de pedido");
    }
  }

  return (
    <div>
    <Header/>

      <main className="flex flex-col max-w-1200px mx-auto px-5 py-10">
        <h1 className="text-center text-[#0d1aa6] mb-30px text-5xl">
          CONSERTO DE ELETRÔNICOS
        </h1>
        <div className="flex ">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#0d1aa6] text-white border-none  p-4 py-3 rounded-[10px] mb-10 cursor-pointer block"
          >
            {" "}
            + Publicar Problema
          </button>
        </div>
      </main>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen ">
          <div className="bg-white rounded-lg w-1/2 h-">
            <div className="bg-[#0b1fa3] p-3 rounded-t-lg text-white text-center p-30px">
              <h2 className="text-xl mb-4">Publicar Problema</h2>
            </div>
            <div className="flex items-center justify-center mt-3">
              <p className=" text-xl mb-4 text-red-700"> {msg}</p>
            </div>
            <div className="p-6">
              <label className="text-black font-medium">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full border p-2 mb-4"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label className="text-black font-medium">Descrição:</label>
              <input
                type="text"
                placeholder="Descreva o problema"
                className="w-full border p-2 mb-4"
                value={descricao}
                onChange={(e) => setDes(e.target.value)}
              />
              <label className="text-black font-medium">Modelo:</label>
              <input
                type="text"
                placeholder="Digite o modelo do aparelho"
                className="w-full border p-2 mb-4"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
              <label className="text-black font-medium">Telefone:</label>
              <input
                type="text"
                placeholder="Digite seu telefone"
                className="w-full border p-2 mb-4"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <div className="flex flex-col">
                <label className="text-black font-medium">Tipo de Eletrônico:</label>
                <select
                  value={tipoeletronico}
                  onChange={(e) => setTipo(e.target.value)}
                  className="border p-2 mb-4"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Computador">Computador</option>
                  <option value="Console">Console</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
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
                  className="px-4 py-2 bg-[#0d1aa6] text-white rounded"
                  onClick={() => trocar()}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
