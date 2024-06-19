import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography, Container, MenuItem, Select} from '@mui/material';
import './BooksGrid.css';
import TextField from "@mui/material/TextField"; // Import your CSS file
import {useTranslation} from 'react-i18next'; // Import useTranslation hook
import BookDetails from './BookDetails'; // Import BookDetails from BookDetails.tsx
import Reviews from './Reviews'; // Import Reviews from Reviews.tsx
import {createLoan, getBooks, getReviewsForBook} from '../api/api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ReviewForm from './ReviewForm';
import withAuth from './WithAuth';




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
    userId: number;
    bookId: number | null;
    content: string;
    rating: number;
    userEmail: string;
}

const BooksGrid = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const {t, i18n} = useTranslation('global'); // Use useTranslation hook
    const [books, setBooks] = useState<Book[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [open, setOpen] = useState(false);
    const [loanDuration, setLoanDuration] = useState<number>(1);

    // In BooksGrid.tsx
    const fillUpBooksArray = (books: Book[]) => {
        const numberOfBooksInRow = 6;
        const remainder = books.length % numberOfBooksInRow;
        if (remainder !== 0) {
            const numberOfNullsToAdd = numberOfBooksInRow - remainder;
            return [...books, ...Array(numberOfNullsToAdd).fill(null)];
        }
        return books;
    };

    const filteredBooks = books.filter(book =>
  book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (book.bookDetails && book.bookDetails.category.toLowerCase().includes(searchTerm.toLowerCase()))
);


    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooks();
            if (booksData) {
                setBooks(booksData);
            }
        };

        fetchBooks();
    }, []);

    const filledUpFilteredBooks = fillUpBooksArray(filteredBooks);

    const handleBookClick = async (book: Book) => {
        console.log('handleBookClick called with book:', book);

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
        console.log('handleSearchChange called with event:', event);

        setSearchTerm(event.target.value);
    };

    const handleSearchFocus = () => {
        console.log('handleSearchFocus called');

        setIsSearchFocused(true);
        setSelectedBook(null);
        setSelectedBookId(null);
    };

    const handleSearchBlur = () => {
        console.log('handleSearchBlur called');

        setIsSearchFocused(false);
    };

    const handleOpen = () => {
        console.log('handleOpen called');

        setOpen(true);
    };
    const handleClose = () => {
        console.log('handleClose called');

        setOpen(false);
    };

    const handleLoanClick = (book: Book | null) => {
        console.log('handleLoanClick called');
        console.log(book)
        if (book) {
            handleOpen();
        }
    };
    const handleConfirmLoan = async (months: number) => {
        console.log('handleConfirmLoan called with months:', months);
        console.log(selectedBook)
        if (selectedBook) {
            const loan = await createLoan(selectedBook.bookId, months);
            console.log(loan)
            if (loan) {
                alert(t('booksgrid.alert.loan_successful'));
            } else {
                alert(t('booksgrid.alert.loan_fail'));
            }
        }

        handleClose();
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
                        style={{marginBottom: '20px',
                            width: '50%' }}
                          placeholder={t('booksgrid.search_placeholder')}

                    />
                    <Grid container spacing={2}>
                        {filledUpFilteredBooks.map((book, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={selectedBook ? 2 : 3} xl={2}
                                  key={index}>                                {book ? (
                                <Paper
                                    className={`book-container ${book.bookId === selectedBookId ? 'selected' : ''}`}
                                    onClick={() => handleBookClick(book)}>
                                    <div className="image-container">
                                        <img src={book.coverImageUrl} alt={book.title} className="book-cover"/>
                                    </div>
                                    <div className="text-container">
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {book.author}
                                        </Typography>
                                    </div>
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
                        <button className="loan-button" onClick={() => handleLoanClick(selectedBook)}>Loan Book</button>
                    </div>
                    <div className="reviews-container">
                        <Reviews reviews={reviews}/></div>
                    <div className="review-form-container">
                        <ReviewForm bookId={selectedBook.bookId}/>
                    </div>

                </div>
            )}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose Loan Duration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('booksgrid.dialog.choose_duration')}
                    </DialogContentText>
                    <Select
                        value={loanDuration}
                        onChange={(event) => setLoanDuration(event.target.value as number)}
                    >
                        <MenuItem value={1}>{t('booksgrid.dialog.choose_duration.1_month')}</MenuItem>
                        <MenuItem value={2}>{t('booksgrid.dialog.choose_duration.2_month')}</MenuItem>
                        <MenuItem value={3}>{t('booksgrid.dialog.choose_duration.3_month')}</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirmLoan(loanDuration)}>{t('booksgrid.dialog.choose_duration.accept')}</Button>
                    <Button onClick={handleClose}>{t('booksgrid.dialog.choose_duration.decline')}</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};
export default BooksGrid;