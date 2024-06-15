import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';

const books = [
  {
    bookId: 1,
    isbn: 'ISBN-1',
    title: 'Book 1',
    author: 'Author 1',
    publisher: 'Publisher 1',
    yearPublished: 2001,
    availableCopies: 5,
    cover_image: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg',
    bookDetails: {
      book_details_id: 1,
      origin_country: 'Country 1',
      category: 'Category 1',
      author_summary: 'Author Summary 1',
      summary: 'Summary 1',
    },
  },
  {
    bookId: 2,
    isbn: 'ISBN-2',
    title: 'Book 2',
    author: 'Author 2',
    publisher: 'Publisher 2',
    yearPublished: 2002,
    availableCopies: 4,
    cover_image: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg',
    bookDetails: {
      book_details_id: 2,
      origin_country: 'Country 2',
      category: 'Category 2',
      author_summary: 'Author Summary 2',
      summary: 'Summary 2',
    },
  },
  {
    bookId: 3,
    isbn: 'ISBN-3',
    title: 'Book 3',
    author: 'Author 3',
    publisher: 'Publisher 3',
    yearPublished: 2003,
    availableCopies: 3,
    cover_image: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg',
    bookDetails: {
      book_details_id: 3,
      origin_country: 'Country 3',
      category: 'Category 3',
      author_summary: 'Author Summary 3',
      summary: 'Summary 3',
    },
  },
  {
    bookId: 4,
    isbn: 'ISBN-4',
    title: 'Book 4',
    author: 'Author 4',
    publisher: 'Publisher 4',
    yearPublished: 2004,
    availableCopies: 2,
    cover_image: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg',
    bookDetails: {
      book_details_id: 4,
      origin_country: 'Country 4',
      category: 'Category 4',
      author_summary: 'Author Summary 4',
      summary: 'Summary 4',
    },
  },
  {
    bookId: 5,
    isbn: 'ISBN-5',
    title: 'Book 5',
    author: 'Author 5',
    publisher: 'Publisher 5',
    yearPublished: 2005,
    availableCopies: 1,
    cover_image: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg',
    bookDetails: {
      book_details_id: 5,
      origin_country: 'Country 5',
      category: 'Category 5',
      author_summary: 'Author Summary 5',
      summary: 'Summary 5',
    },
  },
];

const BooksGrid = () => {
  const booksPerRow = 12 / 2;
  const placeholdersCount = booksPerRow - (books.length % booksPerRow);
  const placeholders = Array.from({ length: placeholdersCount });

  return (
    <Container>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.bookId}>
            <Paper>
              <img src={book.cover_image} alt={book.title} style={{ width: '100%' }} />
              <Typography variant="h6" component="div" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
            </Paper>
          </Grid>
        ))}
        {placeholders.map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`placeholder-${index}`}>
            <Paper style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
              <div style={{ opacity: 0, height: '100%' }}>Placeholder</div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksGrid;