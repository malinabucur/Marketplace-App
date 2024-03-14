import { ChangeEvent } from "react";

export interface SearchBarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchBookByTitle: (e: React.FormEvent) => void;
  searchField: string;
}
