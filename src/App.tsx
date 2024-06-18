import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import BooksGrid from "./components/BooksGrid";
import LoginPage from "./components/LoginForm"; // Import your LoginPage component
import HomePage from "./components/HomePage"; // Import your HomePage component


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/books" element={<BooksGrid />} />

          <Route path="/login" element={<LoginPage />} /> {/* Render LoginPage component at /login */}
          <Route path="/" element={<HomePage />} /> {/* Render HomePage component at / */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;