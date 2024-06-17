import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import BooksGrid from "./components/BooksGrid";
import LoginPage from "./components/LoginForm"; // Import your LoginPage component
import HomePage from "./components/HomePage"; // Import your HomePage component
import Reviews from './components/Reviews'; // Import your Reviews component



// Mock reviews data
const reviews = [
  {
    review_id: 1,
    content: 'Great book!',
    user: { user_id: 1, username: 'User1' },
    book: 1,
    rating: 5,
  },
  {
    review_id: 2,
    content: 'Not my cup of tea.',
    user: { user_id: 2, username: 'User2' },
    book: 1,
    rating: 2,
  }]

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/books" element={<BooksGrid />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />

          <Route path="/login" element={<LoginPage />} /> {/* Render LoginPage component at /login */}
          <Route path="/" element={<HomePage />} /> {/* Render HomePage component at / */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;