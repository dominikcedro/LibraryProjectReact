import React, {useState} from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';
import './BooksGrid.css';
import TextField from "@mui/material/TextField"; // Import your CSS file

const books = [
  {
    bookId: 1,
    isbn: 'ISBN-1',
    title: 'Book 1',
    author: 'Author 1',
    publisher: 'Publisher 1',
    yearPublished: 2001,
    availableCopies: 5,
    cover_image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmediacdn.nhbs.com%2Fjackets%2Fjackets_resizer_xlarge%2F15%2F155236.jpg&f=1&nofb=1&ipt=f95caad33af5934a96bc4a5a548b1f0670e7f21be65bd7c871695c43af6fcd35&ipo=images",
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
    cover_image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs2982.pcdn.co%2Fwp-content%2Fuploads%2F2019%2F06%2FThe-Cerulean-book-cover-678x1024.jpg.optimal.jpg&f=1&nofb=1&ipt=5918a9faf82dc205a2872db61217a7e21c1ccb0b0e0f232ede8d636e34b76da2&ipo=images",
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
    cover_image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.indiabookstore.net%2Fbookish%2Fwp-content%2Fuploads%2F2016%2F12%2Fbest-book-covers-2016-7.jpg&f=1&nofb=1&ipt=5817f532ceb74f1774d12d1e1366ba0e4c7cfc75e90654789937daf0bd681a10&ipo=images",
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
    cover_image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-us.bookshop.org%2Fingram%2F9780593358276.jpg%3Fheight%3D500%26v%3Dv2-d35f10b9693483b70f2f749f3771f61d&f=1&nofb=1&ipt=37add71fc4cf71c66d3a5f1720787110f46365310a7bb316153f3c9a4385311c&ipo=images",
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

interface Book {
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
}
// ... your books array and Book interface here ...

const BooksGrid = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setSelectedBookId(book.bookId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`grid-details-container ${selectedBook ? 'slide-left' : ''}`}>
      <div className="grid-container">
        <Container>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
          <Grid container spacing={2}>
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.bookId} onClick={() => handleBookClick(book)}>
                <Paper className={book.bookId === selectedBookId ? 'selected' : ''}>
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
          </Grid>
        </Container>
      </div>
      {selectedBook && (
        <div className="book-details">
      {selectedBook && (<div className="book-details"><h2>{selectedBook.title}</h2><p><strong>ISBN:</strong> {selectedBook.isbn}</p><p><strong>Author:</strong> {selectedBook.author}</p><p><strong>Publisher:</strong> {selectedBook.publisher}</p><p><strong>Year Published:</strong> {selectedBook.yearPublished}</p><p><strong>Available Copies:</strong> {selectedBook.availableCopies}</p><h3>Book Details</h3><p><strong>ID:</strong> {selectedBook.bookDetails.book_details_id}</p><p><strong>Origin Country:</strong> {selectedBook.bookDetails.origin_country}</p><p><strong>Category:</strong> {selectedBook.bookDetails.category}</p><p><strong>Author Summary:</strong> {selectedBook.bookDetails.author_summary}</p><p><strong>Summary:</strong> {selectedBook.bookDetails.summary}</p></div>)}
        </div>
      )}
    </div>
  );
};

export default BooksGrid;