import { React, useState } from "react";
import { api } from "../../../api/api-config.js";

const CardItem = ({ pedido }) => {
  const [comentario, setComentario] = useState("");
  const nivel = localStorage.getItem("nivel");
  const[open, setOpen]=useState(false)

  const byteArray = new Uint8Array(pedido.data.data);
  const blob = new Blob([byteArray], { type: "image/png" });
  const url = URL.createObjectURL(blob);
  
    async function Enviar_comentario(id_pedido) {
    if(!comentario || comentario == null){
     return alert("Preencha o campo de comentarios")
    }
  try {
    const resposta = await api.put(`/enviar_comentario/${id_pedido}`, {
      comentario,
    });

    if (resposta.status === 201) {
      setOpen(true)
     
    } else {
      alert("Erro ao enviar");
    }
  } catch (error) {
    alert("Comentario inválido!");
    console.log(error);
  }
}

  return (
    <div>
    
    <div
      className="bg-white rounded-[18px] p-4 w-full flex flex-col gap-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg self-start"
      key={pedido.id_pedido}
    >
      <img src={url} className="w-full h-48 object-cover rounded-lg" />

      <p className="self-start text-[12px] px-3 py-1 rounded-[20px] font-semibold bg-[#e3e8ff] text-[#3b4eff]">
        {pedido.tipoeletronico}
      </p>

      <h3 className="text-[20px] font-semibold text-[#222] wrap-break-word">
        {pedido.nome}
      </h3>

      <h5 className="text-[13px] text-[#777] wrap-break-word">
        Número de Contato: {pedido.telefone}
      </h5>

      <hr />

      <h4 className="text-[15px] font-medium text-[#444] pt-1 border-t border-[#eee] wrap-break-word">
        {pedido.modelo}
      </h4>

      <p className="text-[14px] leading-[1.4] wrap-break-word">
        Descrição: {pedido.descricao}
      </p>

      <details className="w-full">
        <summary className="cursor-pointer font-medium">Comentários</summary>

        <p className="mt-2 text-sm text-gray-600 wrap-break-word">
          {pedido.comentario || "Nenhum comentário"}
        </p>
        {nivel == 2 && (
          <div>
            <input
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Digite um comentário..."
              className="mt-3 border border-black rounded p-2 w-full overflow-hidden resize-none focus:outline-none"
            />
            <button
              className="mt-3 bg-[#0d1aa6] hover:bg-[#09157f] cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              onClick={() => Enviar_comentario(pedido.id_pedido)}
            >
              Enviar
            </button>
          </div>
        )}

      </details>
    {open && (
  <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-300">

      <div className="flex flex-col items-center text-center gap-4">

        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Comentário enviado!
        </h1>

        <p className="text-gray-500 text-sm">
          Seu comentário foi enviado com sucesso.
        </p>

        <button
          onClick={() => {setOpen(false); window.location.reload()}}
          className="mt-2 bg-[#8b4dff] hover:bg-[#7a3fff] transition-all text-white font-medium px-6 py-2.5 rounded-xl"
        >
          Fechar
        </button>

      </div>
    </div>
  </div>
)}

    </div>
      
  </div>
    
  );
};

export default CardItem;
