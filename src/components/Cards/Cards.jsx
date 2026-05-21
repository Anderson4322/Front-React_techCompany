import { api } from "../../../api/api-config.js";
import { useState, useEffect } from "react";
export default function Cards() {
  const nivel = localStorage.getItem("nivel");
  const [comentarios, setComentarios] = useState("");
  const [dados, setDados] = useState([]);

  async function buscarUsuarios() {
    try {
      const resposta = await api.get(`/pedidos`);
      setDados(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);
  return (
    <main className="w-full grid grid-cols-1 mb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {dados.map((p) => {
        const byteArray = new Uint8Array(p.data.data);
        const blob = new Blob([byteArray], { type: "image/png" });
        const url = URL.createObjectURL(blob);

        return (
          <div
            className="bg-white rounded-[18px] p-4 w-full flex flex-col gap-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg self-start"
            key={p.id_pedido}
          >
            <img src={url} className="w-full h-48 object-cover rounded-lg" />

            <p className="self-start text-[12px] px-3 py-1 rounded-[20px] font-semibold bg-[#e3e8ff] text-[#3b4eff]">
              {p.tipoeletronico}
            </p>

            <h3 className="text-[20px] font-semibold text-[#222] wrap-break-word">
              {p.nome}
            </h3>

            <h5 className="text-[13px] text-[#777] wrap-break-word">
              Número de Contato: {p.telefone}
            </h5>

            <hr />

            <h4 className="text-[15px] font-medium text-[#444] pt-1 border-t border-[#eee] wrap-break-word">
              {p.modelo}
            </h4>

            <p className="text-[14px] leading-[1.4] wrap-break-word">
              Descrição: {p.descricao}
            </p>

            <details className="w-full">
              <summary className="cursor-pointer font-medium">
                Comentários
              </summary>

              <p className="mt-2 text-sm text-gray-600 wrap-break-word">
                {p.comentario || "Nenhum comentário"}
              </p>
              {nivel == 2  && (
                <div>
                  <textarea
                    rows={1}
                    value={comentarios}
                    onChange={(e) => setComentario(e.target.value)}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder="Digite um comentário..."
                    className="mt-3 border border-black rounded p-2 w-full overflow-hidden resize-none wrap-break-word focus:outline-none"
                  />
                  <button
                    className="mt-3 bg-[#0d1aa6] hover:bg-[#09157f] cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    onClick={() => Enviar_comentario()}
                  >
                    Ok
                  </button>
                </div>
              )}
            </details>
          </div>
        );
      })}
    </main>
  );
}
