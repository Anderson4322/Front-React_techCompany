

export default ()=> {
  return (
    <div className="py-12 px-6">
      <h2 className="text-blue-600 text-2xl font-bold text-center mb-10">
        NOSSO DIFERENCIAL
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <img src="/inteligente.svg" alt="" className="w-16 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-center">
            Atendimento Inteligente
          </h4>
          <p className="text-blue-600 text-center mt-2">
            Processos claros, comunicação rápida e zero enrolação.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <img src="/cadeado.svg" alt="" className="w-16 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-center">
            Segurança Garantida
          </h4>
          <p className="text-blue-600 text-center mt-2">
            Pagamentos e dados protegidos em ambiente seguro.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <img src="/qualidade.svg" alt="" className="w-16 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-center ">
            Agilidade com Qualidade
          </h4>
          <p className="text-blue-600 text-center mt-2">
            Fluxo otimizado para reduzir prazos sem perder qualidade.
          </p>
        </div>
      </div>
    </div>
  );
};
