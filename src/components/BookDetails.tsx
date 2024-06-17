// BookDetails.tsx
import React from 'react';
import './BookDetails.css'; // Import the CSS file

interface BookDetailsProps {
  book: {
    bookId: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    yearPublished: number;
    availableCopies: number;
    cover_image: string;
    bookDetails: {
      book_details_id: number;
      origin_country: string;
      category: string;
      author_summary: string;
      summary: string;
    };
  };
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Year Published:</strong> {book.yearPublished}</p>
      <p><strong>Available Copies:</strong> {book.availableCopies}</p>
      <h3>Book Details</h3>
      <p><strong>ID:</strong> {book.bookDetails.book_details_id}</p>
      <p><strong>Origin Country:</strong> {book.bookDetails.origin_country}</p>
      <p><strong>Category:</strong> {book.bookDetails.category}</p>
      <p><strong>Author Summary:</strong> {book.bookDetails.author_summary}</p>
      <p><strong>Summary:</strong> {book.bookDetails.summary}</p>
    </div>
  );
};

export default BookDetails;