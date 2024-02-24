import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf.js';

function HomePage(props) {
    const {books, onBookChange} = props;

    const booksByShelf = {
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>            
                    <BookShelf
                        onBookShelfChange={onBookChange}
                        title="Currently Reading"
                        bookList={booksByShelf.currentlyReading}
                    />
                    <BookShelf
                        onBookShelfChange={onBookChange}
                        title="Want to Read"
                        bookList={booksByShelf.wantToRead}
                    />
                    <BookShelf
                        onBookShelfChange={onBookChange}
                        title="Read"
                        bookList={booksByShelf.read}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to = '/search'>
                    Add a Book
                </Link>
            </div>
        </div>
    );
}

export default HomePage;