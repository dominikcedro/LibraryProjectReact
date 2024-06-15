import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';

// This is a placeholder for your books data.
// Replace it with your actual data.
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 2, title: 'Book 2', author: 'Author 2', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 3, title: 'Book 3', author: 'Author 3', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 4, title: 'Book 4', author: 'Author 4', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 5, title: 'Book 5', author: 'Author 5', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 2, title: 'Book 2', author: 'Author 2', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 3, title: 'Book 3', author: 'Author 3', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 4, title: 'Book 4', author: 'Author 4', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 5, title: 'Book 5', author: 'Author 5', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 2, title: 'Book 2', author: 'Author 2', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 3, title: 'Book 3', author: 'Author 3', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 4, title: 'Book 4', author: 'Author 4', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  { id: 5, title: 'Book 5', author: 'Author 5', cover: 'http://4.bp.blogspot.com/-tAGRaj4dm58/VARYBHb4NII/AAAAAAAAADU/41VIdeYRb3c/s1600/hobbit-unexpected-journey-ring-poster.jpg' },
  // Add more books here...
];

const BooksGrid = () => {
  // Calculate the number of books per row based on the smallest grid item size.
  // For example, if the smallest grid item size is 'xs={12}', then there is 1 book per row.
  // If the smallest grid item size is 'xs={6}', then there are 2 books per row, and so on.
  const booksPerRow = 12 / 2; // Replace '2' with the 'xs' prop value of your Grid item.

  // Calculate the number of placeholders needed to fill the last row.
  const placeholdersCount = booksPerRow - (books.length % booksPerRow);

  // Create an array of placeholders.
  const placeholders = Array.from({ length: placeholdersCount });

  return (
    <Container>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.id}>
            <Paper>
              <img src={book.cover} alt={book.title} style={{ width: '100%' }} />
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