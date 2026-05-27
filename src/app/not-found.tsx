import Link from "next/link";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-foreground transition-all duration-300 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Check the URL or click below to return home.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all active:scale-95"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
