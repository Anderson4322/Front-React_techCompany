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
       
  A <span className="font-semibold text-zinc-900">TechCompany</span> é uma
  empresa especializada em reparos e soluções tecnológicas para computadores,
  celulares e videogames. Trabalhamos com diversos modelos e marcas do mercado,
  oferecendo serviços de alta qualidade com foco em desempenho, segurança e
  confiabilidade.
  <br></br>
  Nossa equipe utiliza conhecimento técnico, engenharia e tecnologia para
  realizar diagnósticos precisos e encontrar as melhores soluções para cada
  problema. Prezamos pela transparência, agilidade e excelência no atendimento,
  garantindo que cada cliente tenha uma experiência profissional e segura.
  <br></br>
  Na TechCompany, acreditamos que tecnologia e confiança caminham juntas.
  Por isso, buscamos sempre entregar serviços eficientes, com dedicação,
  inovação e compromisso com a satisfação dos nossos clientes.

        </p>
      </section>
      <Footer />
    </div>
  );
};


