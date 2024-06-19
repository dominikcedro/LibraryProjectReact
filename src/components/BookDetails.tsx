// BookDetails.tsx
import React from 'react';
import './BookDetails.css'; // Import the CSS file
import {useTranslation} from 'react-i18next'; // Import useTranslation hook


interface BookDetailsProps {
  book: {
    bookId: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    yearPublished: number;
    availableCopies: number;
    coverImageUrl: string;
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
        const {t, i18n} = useTranslation('global'); // Use useTranslation hook

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>{t('book_details.isbn')}:</strong> {book.isbn}</p>
      <p><strong>{t('book_details.author')}:</strong> {book.author}</p>
      <p><strong>{t('book_details.publisher')}:</strong> {book.publisher}</p>
      <p><strong>{t('book_details.year_published')}:</strong> {book.yearPublished}</p>
      <p><strong>{t('book_details.avaible_copies')}:</strong> {book.availableCopies}</p>
      <h3>{t('book_details.details')}</h3>
      {book.bookDetails ? (
        <>
          <p><strong>ID:</strong> {book.bookDetails.book_details_id}</p>
          <p><strong>{t('book_details.origin_country')}:</strong> {book.bookDetails.origin_country}</p>
          <p><strong>{t('book_details.category')}:</strong> {book.bookDetails.category}</p>
          <p><strong>{t('book_details.author_summary')}:</strong> {book.bookDetails.author_summary}</p>
          <p><strong>{t('book_details.book_summary')}:</strong> {book.bookDetails.summary}</p>
        </>
      ) : (
        <p>{t('book_details.no_details_avaible')}</p>
      )}
    </div>
  );
};
export default BookDetails;