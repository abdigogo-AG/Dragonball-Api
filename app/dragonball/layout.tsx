import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Universo Dragon Ball",
  description: "Explora los personajes de la saga Dragon Ball Z, GT y Super",
};

export default function DragonBallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50 border-b-4 border-yellow-400">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/*Título */}
          <Link 
            href="/dragonball" 
            className="flex items-center gap-2 group"
          >
            {/* Bola de Dragón */}
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-orange-700 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                <span className="text-orange-700 font-bold text-xs">★</span>
            </div>
            
            <span className="text-2xl font-black text-white italic tracking-tighter drop-shadow-md">
              DRAGON BALL
            </span>
          </Link>

          {/* Enlaces del menú */}
          <div className="flex gap-6 text-sm font-bold text-white tracking-wide">
            <Link 
                href="/" 
                className="hover:text-yellow-200 transition-colors uppercase"
            >
              Inicio
            </Link>
            <Link 
                href="/dragonball" 
                className="hover:text-yellow-200 transition-colors uppercase bg-orange-700/30 px-3 py-1 rounded-md"
            >
              Personajes
            </Link>
          </div>
        </nav>
      </header>

      {/* contenido de las páginas */}
      <main className="flex-grow relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        {children}
      </main>

      {/*Pie de página*/}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold text-slate-300 mb-2">
            AG
          </p>
        </div>
      </footer>

    </div>
  );
}