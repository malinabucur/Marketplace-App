import request from "superagent";
import { Book } from "../interfaces/IBook";

const cleanBookData = (books: any[]): Book[] => {
  return books.map((book) => {
    if (!book.volumeInfo.hasOwnProperty("imageLinks")) {
      book.volumeInfo["imageLinks"] = { thumbnail: "https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337" };
    }
    if (!book.saleInfo.hasOwnProperty("listPrice")) {
      book.saleInfo["listPrice"] = { amount: 30 + " RON" };
    }
    return book;
  });
};

export const searchBooksByCategory = async (searchField: string, startIndex: number = 0, maxResults: number = 40): Promise<Book[]> => {
  try {
    const response = await request.get("https://www.googleapis.com/books/v1/volumes").query({ q: `subject:${searchField}`, startIndex, maxResults });

    const cleanedData = cleanBookData(response.body.items || []);

    return cleanedData;
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

    const book = response.body || {};

    return cleanBookData([book])[0];
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const searchBookByTitle = async (title: string, startIndex: number = 0, maxResults: number = 40): Promise<Book[]> => {
  try {
    const response = await request.get("https://www.googleapis.com/books/v1/volumes").query({ q: `${title}`, startIndex, maxResults });

    const cleanedData = cleanBookData(response.body.items || []);

    return cleanedData;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
