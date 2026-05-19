import { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import { api } from "../../../api/api-config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [open, setOpen] = useState(false);
  const [alerta, setAlerta] = useState(localStorage.getItem("nivel"));
  const [nome, setNome] = useState("");
  const [descricao, setDes] = useState("");
  const [tipoeletronico, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");
  const [dados, setDados] = useState([]);
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();

  async function buscarUsuarios() {
    try {
      const resposta = await api.get(`/pedidos`);
      setDados(resposta.data);
      console.log("Componente montado ou dado alterado");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

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
    imagem("");
  }
  function Login() {
    navigate("/Login");
  }
  const formData = new FormData();
  formData.append("descricao", descricao);
  formData.append("nome", nome);
  formData.append("tipoeletronico", tipoeletronico);
  formData.append("modelo", modelo);
  formData.append("telefone", telefone);
  formData.append("imagem", imagem);

  async function cadastrar() {
    const usuario = localStorage.getItem("nome");

    try {
      const resposta = await api.post(`/cad_pedidos`, formData);
      if (resposta.status == 201) {
        return window.location.reload();
      } else {
        alert("Erro ao cadastro de pedido");
      }
    } catch (error) {
      alert("Erro inesperado");
      console.log("erro em.. "+error)
    }
  }

  return (
    <div>
      <Header />

      <main className="flex flex-col max-w-1200px mx-auto px-5 py-10">
        <h1 className="text-center text-[#0d1aa6] mb-30px text-5xl font-semibold">
          CONSERTO DE ELETRÔNICOS
        </h1>
        <div className="flex ">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#0d1aa6] text-white border-none  p-4 py-3 rounded-[10px] mb-10 cursor-pointer block font-semibold"
          >
            {" "}
            + Publicar Problema
          </button>
        </div>

        <main className="w-full p-2 rounded-2xl flex gap-10 flex-wrap">
          {dados.map((p) => {
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
                  Número de Contato:{p.telefone}
                </h5>

                <hr></hr>

                <h4 className="text-[15px] font-medium text-[#444] pt-5px border-t border-[#eee]">
                  {p.modelo}
                </h4>

                <p className="text-[14px] text-[#666] leading-[1.4]">
                  Descrição:{p.descricao}
                </p>

              <details>
                <summary>Comentarios</summary>
                <p>{p.comentario}</p>
              </details>
                <div className="flex gap-3 text-2xl"></div>
              </div>
            );
          })}
        </main>
      </main>

      {!alerta && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-screen ">
          <div className="w-180 rounded-2xl shadow-xl/30 h-45 border-2 bg-white p-4">
            <button
              onClick={() => Login()}
              className="w-15 rounded-4xl h-10 bg-red-500 hover:bg-red-700"
            >
              X
            </button>

            <p className="text-3xl text-blue-700">
              Ops parece parece que voce nao realizou o login...
            </p>
            <p className="text-center mt-2">Feche para ser direcionado a pagina</p>
          </div>
        </div>
      )}

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
              <label className="text-black font-medium">Imagem</label>
              <input
                type="file"
                onChange={(e) => setImagem(e.target.files[0])}
                className="w-full border border-black rounded p-2 text-black"
              />

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
                <label className="text-black font-medium">
                  Tipo de Eletrônico:
                </label>
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
                  onClick={() => {setOpen(false), limpar()}}
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
