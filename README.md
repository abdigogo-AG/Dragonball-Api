Una aplicación web moderna construida con Next.js y Tailwind CSS que explora el universo de Dragon Ball. Consume datos en tiempo real de una API pública para mostrar información detallada sobre personajes, niveles de poder y transformaciones.

## Características Principales

1. Cada visita a la página principal muestra 20 personajes diferentes generados al azar (SSR).

2. Detalle de Personaje: Vista profunda con estadísticas (Ki, Raza, Género), historia y planeta de origen.


3. Galería de Transformaciones: Carrusel interactivo con todas las fases del personaje.

4. Diseño Responsive: Interfaz adaptada a móviles y escritorio con estética "Dark Mode" inspirada en el anime.


## Tecnologías Utilizadas

1. Framework:[Next.js 15](https://nextjs.org/) (App Router)
2. Lenguaje: [TypeScript](https://www.typescriptlang.org/)
3. Estilos: [Tailwind CSS](https://tailwindcss.com/)
4. Datos: [Dragon Ball API](https://web.dragonball-api.com/)

## Instalación y Uso

Sigue estos pasos para correr el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
    cd dragonball-project
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

**Configuración de Imágenes:**
    Asegúrate de que tu archivo `next.config.ts` permita el dominio de la API:
    ```typescript
    const nextConfig = {
      images: {
        remotePatterns: [
          { protocol: "https", hostname: "dragonball-api.com" },
        ],
      },
    };
    ```

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000/dragonball](http://localhost:3000/dragonball) en tu navegador.



