import axios from "axios";
import { Suspense, use } from "react";


function App(){
    function Dados(){
    const lista = use(listaBack);
    return lista.map((user) =><p key={user.id}>{user.nome}</p>)

}
    const listaBack = axios.get("http://localhost:3000/usuarios")
    .then((resp) =>resp.data)
    
    return(
        <Suspense fallback={<h1>Carregando...</h1>}>
        Dados()
    </Suspense>
       
    )
    
}

function App(){
}

export default App;