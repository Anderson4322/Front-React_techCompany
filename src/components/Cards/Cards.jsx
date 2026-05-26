import { api } from "../../../api/api-config.js";
import { useState, useEffect } from "react";
import CardItem from "../CardItem/CardItem.jsx";
export default function Cards() {
  const nivel = localStorage.getItem("nivel");
  const [comentario, setComentario] = useState("");
  const [dados, setDados] = useState([]);

  async function buscarUsuarios() {
    try {
      const resposta = await api.get(`/pedidos`);
      setDados(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

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
  useEffect(() => {
    buscarUsuarios();
  }, []);
  return (
    <main className="w-full grid grid-cols-1 mb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {dados.map((p) => {
        return (<CardItem key={p.id_pedido} pedido={p} />)
      })}
    </main>
  );
}
