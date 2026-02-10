import Image from "next/image";
import Link from "next/link";

//personajes en portada.
const TARGET_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13, 14, 15, 16, 17, 18, 19, 20];

// 2. Interfaz dados del personaje
interface Character {
  id: number;
  name: string;
  ki: string;
  race: string;
  gender: string;
  image: string;
  affiliation: string;
}
// 3. Función para obtener un solo personaje (maneja errores si uno falla)
async function getCharacter(id: number): Promise<Character | null> {
  try {
    const res = await fetch(`https://dragonball-api.com/api/characters/${id}`, {
      next: { revalidate: 3600 }, // Guarda en caché por 1 hora para que sea rápido
    });
    
    if (!res.ok) return null;
    
    const data: Character = await res.json();
    return data;
  } catch (error) {
    console.error(`Error al cargar personaje ${id}:`, error);
    return null;
  }
}

export default async function DragonBallPage() {
  // 4. Peticiones en PARALELO (Todas a la vez)
  const charactersData = await Promise.all(
    TARGET_IDS.map(async(id) => getCharacter(id))
  );

  // 5.por si algún ID falló lo quitamos
  const characters = charactersData.filter((char) => char !== null) as Character[];

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-black text-center text-red-500 mb-2 uppercase tracking-tighter italic">
          Selecciona tu <span className="text-yellow-400">Guerrero</span>
        </h1>
        <p className="text-slate-400 text-center mb-10 font-medium">
            Explora el universo y sus niveles de poder
        </p>

        {/*Muestra los personajes*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link 
                key={char.id} 
                href={`/dragonball/${char.id}`}
                className="group relative block h-[400px] perspective-1000"
            >
              <div className="relative h-full w-full bg-slate-800 rounded-2xl border-2 border-slate-700 overflow-hidden transition-all duration-300 group-hover:border-yellow-400 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] group-hover:-translate-y-2">
                
                {/* Fondo de la tarjeta*/}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10" />
                
                {/* Imagen del personaje */}
                <div className="absolute top-0 left-0 w-full h-3/4 p-4 z-0 bg-slate-700/30 group-hover:bg-slate-700/50 transition-colors">
                    <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 w-full p-4 z-20 flex flex-col items-center text-center">
                    
                    {/* Nombre */}
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-wider mb-1 group-hover:text-yellow-400 transition-colors">
                        {char.name}
                    </h2>
                    
                    {/* Detalles */}
                    <div className="flex gap-2 text-xs font-bold text-slate-300 mb-2">
                        <span className="bg-slate-700 px-2 py-1 rounded border border-slate-600">
                            {char.race}
                        </span>
                        <span className="bg-slate-700 px-2 py-1 rounded border border-slate-600">
                            {char.gender}
                        </span>
                    </div>

                    {/*KI */}
                    <div className="w-full bg-slate-900/80 rounded-lg p-2 border border-slate-700 mt-1">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Poder de Pelea</p>
                        <p className="text-yellow-500 font-mono font-bold text-lg">
                            {char.ki}
                        </p>
                    </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}