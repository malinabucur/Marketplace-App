import SearchBar from "./components/molecules/searchBar";
import Navbar from "./components/organisms/navbar";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div className="m-2 grid justify-center">
        <SearchBar />
      </div>
    </main>
  );
}
