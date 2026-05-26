"use client";

import { useState } from "react";
import { 
  FaInfoCircle, 
  FaPalette, 
  FaFont, 
  FaCogs, 
  FaCheckCircle, 
  FaArrowRight, 
  FaRegHeart, 
  FaHeart,
  FaShareAlt,
  FaCopy
} from "react-icons/fa";

export default function ThemeShowcase() {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx create-next-app zilla_h3");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = [
    { name: "Primary", bgClass: "bg-primary", textClass: "text-primary-foreground", desc: "Color principal de la marca y acentos destacados (azul marino en claro, rojo vivo en oscuro)." },
    { name: "Secondary", bgClass: "bg-secondary", textClass: "text-secondary-foreground", desc: "Botones secundarios y áreas de soporte de menor contraste." },
    { name: "Accent", bgClass: "bg-accent", textClass: "text-accent-foreground", desc: "Resaltar elementos interactivos importantes y llamadas a la acción." },
    { name: "Muted", bgClass: "bg-muted", textClass: "text-muted-foreground", desc: "Fondos secundarios desvanecidos y texto de menor importancia." },
    { name: "Card", bgClass: "bg-card border border-border", textClass: "text-card-foreground", desc: "Fondos para componentes de tarjetas y paneles contenedores." },
    { name: "Popover", bgClass: "bg-popover border border-border", textClass: "text-popover-foreground", desc: "Menús contextuales, popovers y tooltips flotantes." },
    { name: "Destructive", bgClass: "bg-destructive", textClass: "text-destructive-foreground", desc: "Acciones de peligro, errores o eliminaciones críticas." },
    { name: "Background", bgClass: "bg-background border border-border", textClass: "text-foreground", desc: "El color de fondo principal de toda la aplicación." },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24 transition-all duration-300">
      
      {/* Hero Section */}
      <div id="inicio" className="text-center space-y-6 max-w-3xl mx-auto py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider">
          <FaCogs className="w-3.5 h-3.5" /> Entorno de Estilos Inicializado
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Visualizador de <span className="text-primary transition-colors duration-300">Tema y Tipografías</span>
        </h1>
        <p className="lead max-w-2xl mx-auto text-muted-foreground text-lg sm:text-xl">
          Este showcase presenta las fuentes locales <strong className="text-foreground font-semibold">Evolve Sans EVO</strong> y <strong className="text-foreground font-semibold">MADE Evolve Sans</strong>,
          junto a la paleta de colores del proyecto, adaptándose perfectamente al tema actual.
        </p>
      </div>

      <hr className="border-border" />

      {/* Tipografía Section */}
      <div id="tipografias" className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <FaFont className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Estructura Tipográfica</h2>
            <p className="text-sm text-muted-foreground">Tipografía principal: <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">MADE Evolve Sans</code> y <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">Evolve Sans EVO</code>.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Columna Izquierda: Headings */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-semibold border-b border-border pb-2 text-muted-foreground mb-4">
              Títulos (Evolve Sans EVO)
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h1. Heading 1 (700)</span>
                <h1>El veloz murciélago hindú</h1>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h2. Heading 2 (700)</span>
                <h2>El veloz murciélago hindú</h2>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h3. Heading 3 (500)</span>
                <h3>El veloz murciélago hindú</h3>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h4. Heading 4 (500)</span>
                <h4>El veloz murciélago hindú comería feliz</h4>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h5. Heading 5 (500)</span>
                <h5>El veloz murciélago hindú comería feliz cardillo y kiwi</h5>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">h6. Heading 6 (500)</span>
                <h6>El veloz murciélago hindú comería feliz cardillo y kiwi. La cigüeña toca el saxofón detrás del palenque.</h6>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Parrafos y variaciones */}
          <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
            <h3 className="text-lg font-semibold border-b border-border pb-2 text-muted-foreground mb-4">
              Cuerpo de Texto y Variaciones
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">p. Lead / Introducción</span>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">p. Texto Regular</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                </p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">p. Estilos Especiales</span>
                <p className="space-x-4">
                  <strong className="font-bold">Texto en Negrita</strong>
                  <span className="italic">Texto en Cursiva</span>
                  <span className="underline">Texto Subrayado</span>
                </p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">blockquote. Cita</span>
                <blockquote className="border-l-4 border-primary pl-4 py-1 italic bg-muted/20 text-foreground/90 rounded-r-md">
                  "El diseño no es solo lo que se ve y lo que se siente. El diseño es cómo funciona."
                  <span className="block text-xs font-semibold mt-1 not-italic text-muted-foreground">— Steve Jobs</span>
                </blockquote>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-1">code. Código en línea</span>
                <p>
                  Para arrancar el servidor ejecuta <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm border border-border text-foreground">pnpm dev</code> en tu terminal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Colores Section */}
      <div id="colores" className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <FaPalette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Paleta de Colores Dinámica</h2>
            <p className="text-sm text-muted-foreground">Visualización de variables CSS asignadas. Prueba a alternar el modo oscuro para ver los cambios.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color) => (
            <div 
              key={color.name} 
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Muestra de color */}
              <div className={`h-24 ${color.bgClass} flex items-end p-4 transition-colors duration-300`}>
                <span className={`font-mono text-xs font-bold px-2 py-0.5 bg-black/10 dark:bg-white/10 rounded backdrop-blur-sm ${color.textClass}`}>
                  {color.name}
                </span>
              </div>
              {/* Info de color */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <span className="font-semibold text-sm text-foreground">{color.name} Color</span>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {color.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Componentes de Ejemplo */}
      <div id="componentes" className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <FaInfoCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Galería de Componentes de Ejemplo</h2>
            <p className="text-sm text-muted-foreground">Muestra de componentes comunes y micro-animaciones interactivas.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tarjetas e Interacción */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-border pb-2 text-muted-foreground">
              Tarjetas & Micro-interacciones
            </h3>
            
            {/* Tarjeta Interactiva */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Destacado</span>
                  <h4 className="text-xl font-bold mt-1 text-foreground">Avatar Creator Zilla_H3</h4>
                </div>
                <button 
                  onClick={() => setLiked(!liked)}
                  className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-300 cursor-pointer"
                >
                  {liked ? <FaHeart className="w-5 h-5 text-destructive" /> : <FaRegHeart className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Este contenedor tiene una sutil micro-animación en hover, un borde reactivo a tu color primario y un estado interactivo para el botón de me gusta.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs text-muted-foreground">Activo ahora</span>
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group-hover:gap-2">
                  Ver detalles <FaArrowRight className="w-3 h-3 transition-transform" />
                </a>
              </div>
            </div>

            {/* Fórmulas e Inputs */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h4 className="text-md font-bold mb-4 text-foreground">Formulario de Registro (Inputs y Foco)</h4>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-medium text-foreground">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="ejemplo@zilla.com" 
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="pass" className="block text-xs font-medium text-foreground">
                    Contraseña
                  </label>
                  <input 
                    type="password" 
                    id="pass" 
                    placeholder="••••••••" 
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <button type="submit" className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/95 transition-colors cursor-pointer">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>

          {/* Variaciones de Botones y Código */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-border pb-2 text-muted-foreground">
              Botones y Elementos de Código
            </h3>

            {/* Grupo de Botones */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h4 className="text-md font-bold text-foreground mb-2">Variantes de Botones</h4>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors cursor-pointer">
                  Primario
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors cursor-pointer">
                  Secundario
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground shadow-sm hover:bg-accent/80 transition-colors cursor-pointer">
                  Acento
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                  Bordeado
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                  Fantasma
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg bg-destructive px-4 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/95 transition-colors cursor-pointer">
                  Destructivo
                </button>
              </div>
            </div>

            {/* Copy Clipboard Box */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h4 className="text-md font-bold text-foreground">Portapapeles & Feedback de Acción</h4>
              <p className="text-xs text-muted-foreground">Haz clic en el botón de copiar para probar el feedback visual.</p>
              <div className="flex items-center justify-between rounded-lg bg-muted/60 border border-border p-3.5 font-mono text-sm">
                <span className="text-foreground select-all">pnpm create-next-app zilla_h3</span>
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
                  title="Copiar comando"
                >
                  {copied ? <FaCheckCircle className="w-4 h-4 text-emerald-500 animate-bounce" /> : <FaCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Alerta de información de prueba */}
            <div className="flex gap-3 rounded-2xl bg-primary/5 border border-primary/20 p-4 text-sm text-foreground leading-relaxed">
              <FaInfoCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-foreground block">¿Sabías qué?</span>
                La fuente <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">MADE Evolve Sans</code> tiene soporte completo para glifos en español (acentos, eñes) en sus diferentes grosores delgados y gruesos.
              </div>
            </div>

          </div>

        </div>
      </div>
      
    </section>
  );
}
