import BooksIcon from "../atoms/books";

export default function Logo() {
  return (
    <div className="flex">
      <BooksIcon />
      <div className="text-4xl mt-4 ml-3">Books Marketplace</div>
    </div>
  );
}
