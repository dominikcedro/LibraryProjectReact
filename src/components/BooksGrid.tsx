import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography, Container} from '@mui/material';
import './BooksGrid.css';
import TextField from "@mui/material/TextField"; // Import your CSS file
import {useTranslation} from 'react-i18next'; // Import useTranslation hook
import BookDetails from './BookDetails'; // Import BookDetails from BookDetails.tsx
import Reviews from './Reviews'; // Import Reviews from Reviews.tsx
import {getBooks, getReviewsForBook} from '../api/api';


interface Book {
    bookId: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    yearPublished: number;
    availableCopies: number;
    coverImageUrl: string; // Add this line
    bookDetails: {
        book_details_id: number;
        origin_country: string;
        category: string;
        author_summary: string;
        summary: string;
    };
}

interface Review {
  review_id: number;
  content: string;
  user: { user_id: number, username: string };
  book: { bookId: number };
  rating: number;
}

const BooksGrid = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const {t, i18n} = useTranslation('global'); // Use useTranslation hook
    const [books, setBooks] = useState<Book[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);


    // In BooksGrid.tsx
    const fillUpBooksArray = (books: Book[]) => {
        const numberOfBooksInRow = 5;
        const remainder = books.length % numberOfBooksInRow;
        if (remainder !== 0) {
            const numberOfNullsToAdd = numberOfBooksInRow - remainder;
            return [...books, ...Array(numberOfNullsToAdd).fill(null)];
        }
        return books;
    };

// Then use this function when setting the books state


    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooks();
            if (booksData) {
                setBooks(booksData);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book && book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filledUpFilteredBooks = fillUpBooksArray(filteredBooks);

    const handleBookClick = async (book: Book) => {
  if (book.bookId !== selectedBookId) {
    setSelectedBook(book);
    setSelectedBookId(book.bookId);
    const bookReviews = await getReviewsForBook(book.bookId);
    console.log('Retrieved reviews:', bookReviews); // Log the retrieved reviews
    setReviews(bookReviews || []);
  } else {
    setSelectedBook(null);
    setSelectedBookId(null);
    setReviews([]);
  }
};

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
        setSelectedBook(null);
        setSelectedBookId(null);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    return (
        <div className={`grid-details-container ${selectedBook ? 'slide-left' : ''}`}>
            <div className="grid-container">
                <Container>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        style={{marginBottom: '20px'}}
                    />
                    <Grid container spacing={2}>
                        {filledUpFilteredBooks.map((book, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                {book ? (
                                    <Paper className={book.bookId === selectedBookId ? 'selected' : ''}
                                           onClick={() => handleBookClick(book)}>
                                        <img src={book.coverImageUrl} alt={book.title}/>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {book.author}
                                        </Typography>
                                    </Paper>
                                ) : (
                                    <div className="shadow-book"></div>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
            {!isSearchFocused && selectedBook && (
                <div className="grid-container">
                    <div className="book-details-container">
                        <BookDetails book={selectedBook}/>
                    </div>
                    <div className="reviews-container">
                        <Reviews reviews={reviews}/></div>
                </div>
            )}
        </div>
    );
};
export default BooksGrid;