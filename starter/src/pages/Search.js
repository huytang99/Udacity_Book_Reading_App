import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Book from '../components/Book';
import useDebounce from "../utils/useDebounce";

function Search({books, onBookChange}) {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [query, setQuery] = useState('');

    const searchInputDebounceValue = useDebounce(query, 500);

    useEffect(() => {
        const searchBooks = (query) => {
            BooksAPI.search(query)
                .then((books) => {
                    if (query === '' || books.error) {
                    setSearchedBooks([]);
                    } else {
                    setSearchedBooks(books);
                    }
            });
        }
        searchBooks(searchInputDebounceValue);
    }, [searchInputDebounceValue]);

    const updateQuery = (queryValue) => {
        setQuery(queryValue.trimStart());
    }

      const resetSearch = () => {
        setSearchedBooks([]);
      }
    

    const searchedBooksUpdatedWithShelves = searchedBooks.map(searchedBook => {
        const matchingBookFromShelves = books.find(book => book.id === searchedBook.id);
        return matchingBookFromShelves ? { ...searchedBook, shelf: matchingBookFromShelves.shelf } : searchedBook;
    });
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                    onClick = {resetSearch}
                >
                    Close
                </Link>

                <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search books by title or author"
                    value = {query}
                    onChange = {(event) => updateQuery(event.target.value)}
                />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">
                {
                    (searchedBooks.length > 0) ? (
                        searchedBooksUpdatedWithShelves.map(book => (
                            <li key={book.id}>
                                <Book book={book} onBookChange = {onBookChange} />
                            </li>
                        ))
                    ) : (query !== '') ? <li>
                        <h2>Oops! No books matches</h2>
                        <h3>Please update the query</h3>
                        </li> : <li></li>
                }
                </ol>
            </div>
        </div>
    );
}

export default Search;