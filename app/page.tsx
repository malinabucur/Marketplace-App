import Footer from "./components/molecules/footer";
import Cards from "./components/organisms/cards";
import Navbar from "./components/organisms/navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <Cards />
      </main>
      <Footer />
    </>
  );
}
