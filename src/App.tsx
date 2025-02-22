import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import BooksGrid from "./components/BooksGrid";
import LoginPage from "./components/LoginForm"; // Import your LoginPage component
import HomePage from "./components/HomePage";
import MyShelf from "./components/MyShelf";
import RegisterForm from "./components/RegisterForm"; // Import your HomePage component


function App() {
  useEffect(() => {
    document.title = 'YourLibrary';
  }, []);
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/books" element={<BooksGrid />} />
          <Route path="/my-shelf" element={<MyShelf />} /> {/* Change this line */}
          <Route path={"/register"} element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} /> {/* Render LoginPage component at /login */}
          <Route path="/" element={<HomePage />} /> {/* Render HomePage component at / */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;