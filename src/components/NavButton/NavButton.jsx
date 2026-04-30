
const NavButton = ({ children, onClick, pequeno }) =>{
  const largura = pequeno ? "w-[140px] " : "w-[200px]";


  return (
    <button 
      onClick={onClick}
      className={`${largura} h-8.5 bg-white/20 border border-white/50 rounded-md text-white font-bold mb-[3vh] transition-all duration-200 hover:bg-blue-600 hover:scale-110 cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default NavButton
