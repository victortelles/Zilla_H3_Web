import Navbar from "@/components/ui/navbar/Navbar";
import ThemeShowcase from "@/components/ThemeShowcase";
import Footer from "@/components/ui/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-foreground transition-all duration-300">
        <ThemeShowcase />
      </main>
      <Footer />
    </>
  );
}

