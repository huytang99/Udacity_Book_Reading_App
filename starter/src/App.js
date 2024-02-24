import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import * as BooksAPI from './api/BooksAPI';
import HomePage from './pages/HomePage';
import Search from './pages/Search';

function App() {
  const [books, setBooks] = useState([]);
  console.log(books)

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setBooks(books);
      });
  }, []);
  
  const onBookChange = (bookChanged, shelf) => {
    const bookExists = books.some(book => book.id === bookChanged.id);
    if (bookExists) {
      const movedBooks = books.map(book => {
        if (book.id === bookChanged.id) {
          book.shelf = shelf;
        }
        return book;
      });
      BooksAPI.update(bookChanged, shelf);
      setBooks(movedBooks);
    } else {
      BooksAPI.update(bookChanged, shelf).then(() => {
        BooksAPI.getAll().then((books) => {
          setBooks(books);
        });
      });
  }
};

  return (
    <div className="app">
      <Routes>
        <Route
          exact path='/'
          element = {
            <HomePage
              books = {books}
              onBookChange = {onBookChange}
            />
          }
        />
        <Route
          path='/search'
          element = {
            <Search
              books = {books}
              onBookChange = {onBookChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;