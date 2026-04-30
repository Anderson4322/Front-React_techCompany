import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState();

  console.log(email,senha)
    const navigate = useNavigate();

async function Logar() {
  try {
    const resposta = await axios.post('http://localhost:3000/usuarios/login', {
      email,
      senha,
    });
  localStorage.setItem('nome', resposta.data.nome);
localStorage.setItem('email', resposta.data.email);


    navigate("/Home");

  } catch (erro) {
    alert("Erro ao logar");
    console.log(erro);
  }
}


  return (
    <div>
     <div className="w-full bg-gray-200 h-185 flex justify-center items-center">
  
  <div className="bg-[#000080]/90 flex justify-center gap-3 text-white rounded-l-4xl flex-col items-center h-100 w-100 shadow-2xl">
    
    <h1 className="text-4xl font-semibold">Olá, amigo</h1>
    
    <p className="text-white/80 text-center px-6">
      Cadastre-se para começar a usar nossos serviços
    </p>
    
    <button className="w-40 h-12 rounded-2xl border border-white/50 hover:bg-white/10 transition">
      Cadastra-se
    </button>

  </div>

  <div className="bg-white p-6 w-100 rounded-r-4xl h-100 flex flex-col gap-4 justify-center items-center shadow-2xl">
    
    <h1 className="text-4xl font-bold">Login</h1>

    <label className="text-gray-600 self-start ml-10">Email:</label>
    
    <input
      className="w-80 rounded-lg h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40"
      value={email}
      onChange={(e)=>{setEmail(e.target.value)}}
      type="text"
      placeholder="Digite seu email"
    />

    <label className="text-gray-600 self-start ml-10">Senha:</label>
    
    <input
      className="w-80 rounded-lg h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40"
      value={senha}
      onChange={(e) => {
        setSenha(e.target.value);
      }}
      type="text"
      placeholder="Digite sua senha"
    />

    <button 
      onClick={()=>Logar()} 
      className="w-50 h-10 rounded-lg bg-blue-900/80 text-white hover:bg-blue-900 transition"
    >
      Logar
    </button>

  </div>
</div>
    </div>
  );
}
