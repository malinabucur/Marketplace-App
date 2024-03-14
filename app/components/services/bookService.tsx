import request from "superagent";
import { Book } from "../interfaces/IBook";

export const searchBooksByCategory = async (searchField: string, startIndex: number = 0, maxResults: number = 40): Promise<Book[]> => {
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
    const books = await searchBooksByCategory(searchField);
    return books;
  } catch (error) {
    console.error("Error searching and updating books:", error);
    return [];
  }
};

export const searchBookById = async (id: string): Promise<Book> => {
  try {
    const response = await request.get("https://www.googleapis.com/books/v1/volumes/" + id);
    return response.body || undefined;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const searchBookByTitle = async (title: string, startIndex: number = 0, maxResults: number = 40): Promise<Book[]> => {
  try {
    const response = await request.get("https://www.googleapis.com/books/v1/volumes").query({ q: `${title}`, startIndex, maxResults });
    return response.body.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
