import { React, useState } from "react";
import { api } from "../../../api/api-config.js";

const CardItem = ({ pedido }) => {
  const [comentario, setComentario] = useState("");
  const nivel = localStorage.getItem("nivel");

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
      alert("Comentario enviado com sucesso");
      window.location.reload()
    } else {
      alert("Erro ao enviar");
    }
  } catch (error) {
    alert("Comentario inválido!");
    console.log(error);
  }
}

  return (
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
        {nivel == 2 || nivel == 3 && (
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
    </div>
  );
};

export default CardItem;
