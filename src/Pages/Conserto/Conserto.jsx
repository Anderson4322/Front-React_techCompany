import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import { api } from "../../../api/api-config.js";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Cards/Cards.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const [alerta, setAlerta] = useState(localStorage.getItem("nivel"));
  const [nome, setNome] = useState("");
  const nivel = localStorage.getItem("nivel");
  const [descricao, setDes] = useState("");
  const [tipoeletronico, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [dados, setDados] = useState([]);
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();


  function trocar() {
    nome == "" ||
    descricao == "" ||
    tipoeletronico == "" ||
    modelo == "" ||
    telefone == "" ||
    imagem == ""
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
    setImagem("");
  }

  function Login() {
    navigate("/Login");
  }

  async function cadastrar() {
    const formData = new FormData();

    formData.append("descricao", descricao);
    formData.append("nome", nome);
    formData.append("tipoeletronico", tipoeletronico);
    formData.append("modelo", modelo);
    formData.append("telefone", telefone);
    formData.append("imagem", imagem);

    try {
      const resposta = await api.post(`/cad_pedidos`, formData);

      if (resposta.status == 201) {
        return window.location.reload();
      } else {
        alert("Erro ao cadastro de pedido");
      }
    } catch (error) {
      alert("Erro inesperado");
      console.log("erro em.. " + error);
    }
  }

  async function Enviar_comentario() {
    try {
      const {data} = await api.get(`/pedidos/${id_pedido}`);
      const res = await api.put(`/comentarios/${data.id_pedido}`, {
        comentarios,
      });

      if (resposta.status == 201) {
        alert("Comentario enviado com sucesso");
      } else {
        alert("Erro ao enviar");
      }
    } catch (error) {
      alert("Comentario inválido!");
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <Header />

      <main className="flex flex-col max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <h1 className="text-center text-[#0d1aa6] mb-8 text-3xl md:text-5xl font-semibold">
          CONSERTO DE ELETRÔNICOS
        </h1>

        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#0d1aa6] text-white px-5 py-3 rounded-[10px] mb-10 cursor-pointer font-semibold hover:bg-[#09157f] transition"
          >
            + Publicar Problema
          </button>
        </div>
      </main>
     <Cards/>

      {/* ALERTA LOGIN */}
      {!alerta && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen p-4 z-50">
          <div className="w-[95%] max-w-2xl rounded-2xl shadow-xl border-2 bg-white p-4 md:p-6">
            <button
              onClick={() => Login()}
              className="w-12 h-10 rounded-4xl bg-red-500 hover:bg-red-700 text-white transition"
            >
              X
            </button>

            <p className="text-xl md:text-3xl text-blue-700 mt-4">
              Ops parece que você não realizou o login...
            </p>

            <p className="text-center mt-4 text-gray-600">
              Feche para ser direcionado à página
            </p>
          </div>
        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen p-4 overflow-y-auto z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-xl">
            <div className="bg-[#0b1fa3] p-5 rounded-t-lg text-white text-center">
              <h2 className="text-2xl font-semibold">Publicar Problema</h2>
            </div>

            <div className="flex items-center justify-center mt-3">
              <p className="text-lg text-red-700">{msg}</p>
            </div>

            <div className="p-6">
              <label className="text-black font-medium">Imagem</label>

              <input
                type="file"
                onChange={(e) => setImagem(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-black"
              />

              <label className="text-black font-medium">Nome:</label>

              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1aa6]/40"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label className="text-black font-medium">Descrição:</label>

              <input
                type="text"
                placeholder="Descreva o problema"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1aa6]/40"
                value={descricao}
                onChange={(e) => setDes(e.target.value)}
              />

              <label className="text-black font-medium">Modelo:</label>

              <input
                type="text"
                placeholder="Digite o modelo do aparelho"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1aa6]/40"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />

              <label className="text-black font-medium">Telefone:</label>

              <input
                type="text"
                placeholder="Digite seu telefone"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1aa6]/40"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />

              <div className="flex flex-col">
                <label className="text-black font-medium">
                  Tipo de Eletrônico:
                </label>

                <select
                  value={tipoeletronico}
                  onChange={(e) => setTipo(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1aa6]/40"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Computador">Computador</option>
                  <option value="Console">Console</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    limpar();
                  }}
                  className="px-4 py-3 bg-gray-300 rounded text-black hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>

                <button
                  className="px-4 py-3 bg-[#0d1aa6] text-white rounded hover:bg-[#09157f] transition"
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
