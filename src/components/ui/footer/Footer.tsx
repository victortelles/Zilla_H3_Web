import { FaGithub, FaTwitter, FaDiscord, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <FaGithub className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <FaDiscord className="h-5 w-5" />, href: "#", label: "Discord" },
    { icon: <FaInstagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  const columns = [
    {
      title: "Soluciones",
      links: [
        { name: "Creador de Avatares", href: "#" },
        { name: "H3 Ecosistema", href: "#" },
        { name: "Zilla Studio", href: "#" },
        { name: "API de Desarrollo", href: "#" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { name: "Documentación", href: "#" },
        { name: "Guías de Estilo", href: "#" },
        { name: "Estado del API", href: "#" },
        { name: "Contacto", href: "#" },
      ],
    },
    {
      title: "Compañía",
      links: [
        { name: "Acerca de", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Prensa", href: "#" },
        { name: "Términos y Privacidad", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-black text-xl">
                Z
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                ZILLA<span className="font-light text-muted-foreground">H3</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              La plataforma definitiva para la creación de avatares interactivos del ecosistema H3. Diseña, personaliza y despliega.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                  {col.title}
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Zilla H3 Inc. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
