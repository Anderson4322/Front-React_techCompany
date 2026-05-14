import { Link, useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    function Home(){
        navigate("/")
    }
  return (
    <div className="min-h-screen bg-[#05058C] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Ocorreu um erro no caminho da página
        </h1>

        <p className="text-blue-100 mb-8">
          A página que você tentou acessar não foi encontrada.
        </p>

        <button
            onClick={()=>Home()}
          className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg text-white"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default Error;
