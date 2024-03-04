import { ChangeEvent } from "react";

export interface SearchBarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchBook: (e: React.FormEvent) => void;
}
