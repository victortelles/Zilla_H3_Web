import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-foreground transition-all duration-300 flex items-center justify-center min-h-[50vh]">
        <h1 className="text-3xl font-display font-bold">Admin Dashboard Under Construction</h1>
      </main>
      <Footer />
    </>
  );
}
