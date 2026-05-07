import Footer from '../../components/Footer/index.jsx'
import Header from '../../components/Header/Header.jsx'
import { Link } from 'react-router-dom';
 export default function SobreNos(){
  return (
    <div className="min-h-screen bg-gray-100">
      <Header/> 

      <section className="text-center py-12 px-6">
        <h1 className=" text-blue-700 text-3xl font-bold mb-4">QUEM SOMOS NÓS?</h1>

        <p className="max-w-2xl mx-auto text-blue-700">
          Somos especializados em reparos de alta qualidade em computadores,
          celulares e videogames, atendendo diversos modelos e marcas do mercado
          atual. Nosso trabalho é baseado em conhecimento técnico, engenharia e
          tecnologia, garantindo diagnósticos precisos e soluções confiáveis.
        </p>
      </section>
      <Footer />
    </div>
  );
};


