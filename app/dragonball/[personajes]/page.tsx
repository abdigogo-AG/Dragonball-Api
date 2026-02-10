import Image from "next/image";
import Link from "next/link";

interface CharacterDetail {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  originPlanet: {
    name: string;
    image: string;
  };
  transformations: Array<{
    id: number;
    name: string;
    image: string;
    ki: string;
  }>;
}

// Definimos que recibimos 'params' (es una Promesa en Next.js reciente)
interface PageProps {
  params: Promise<{
    personajes: string; // Se llama 'personajes' porque así se llama la carpeta [personajes]
  }>;
}

// Función para obtener un solo personaje detallado
async function getCharacterDetail(id: string): Promise<CharacterDetail | null> {
  try {
    const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function CharacterPage({ params }: PageProps) {
  // 1. Desempaquetamos el ID de la URL
  const { personajes } = await params; // 'personajes' es el ID (ej: "1")
  
  // 2. Buscamos los datos
  const character = await getCharacterDetail(personajes);

  // 3. Si no existe o hubo error
  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-900">
        <h1 className="text-4xl font-bold mb-4">¡Guerrero no encontrado!</h1>
        <Link href="/dragonball" className="text-yellow-400 hover:underline">
            Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Botón Volver */}
        <Link href="/dragonball" className="inline-block mb-8 text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
          Volver
        </Link>

        {/* Sección Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Columna Izquierda: Imagen Gigante */}
          <div className="relative h-[600px] w-full bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
             <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-contain p-4 drop-shadow-[0_0_15px_rgba(255,255,0,0.3)]"
                priority // Carga esta imagen rápido porque es la principal
             />
          </div>

          {/* Columna Derecha: Datos */}
          <div className="space-y-6">
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter">
             {character.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm font-bold">
              <span className="px-4 py-2 bg-yellow-500 text-black rounded-full">
                Raza: {character.race}
              </span>
              
              <span className="px-4 py-2 bg-slate-700 rounded-full border border-slate-600">
                Genero: {character.gender}
              </span>
              <span className="px-4 py-2 bg-slate-700 rounded-full border border-slate-600">
                Planeta: {character.originPlanet.name}
              </span>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-yellow-500 pl-6">
              {character.description}
            </p>

            <div className="grid grid-cols-2 gap-4 bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div>
                    <p className="text-slate-400 text-xs uppercase">KI Base</p>
                    <p className="text-2xl font-mono text-yellow-400">{character.ki}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs uppercase">KI Máximo</p>
                    <p className="text-2xl font-mono text-red-400">{character.maxKi}</p>
                </div>
            </div>

            {/* Transformaciones (Si tiene) */}
            {character.transformations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Transformaciones</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {character.transformations.map((trans) => (
                    <div key={trans.id} className="min-w-[120px] text-center">
                      <div className="relative w-24 h-24 mx-auto mb-2 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-600">
                        <Image 
                            src={trans.image} 
                            alt={trans.name} 
                            fill 
                            className="object-cover object-top"
                        />
                      </div>
                      <p className="text-xs text-slate-300">{trans.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}