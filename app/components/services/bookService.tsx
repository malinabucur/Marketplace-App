import request from "superagent";
import { Book } from "../interfaces/IBook";

export const searchBooks = async (searchField: string, startIndex: number = 0, maxResults: number = 40): Promise<Book[]> => {
  try {
    const response = await request.get("https://www.googleapis.com/books/v1/volumes").query({ q: `subject:${searchField}`, startIndex, maxResults });
    return response.body.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const handleSearch = async (searchField: string): Promise<Book[]> => {
  try {
    const books = await searchBooks(searchField);
    return books;
  } catch (error) {
    console.error("Error searching and updating books:", error);
    return [];
  }
};
