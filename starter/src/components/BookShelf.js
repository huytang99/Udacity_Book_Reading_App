import Book from './Book';

function BookShelf({bookList, title, onBookShelfChange} ) {

    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    bookList.map(book => (
                    <li key={book.id}>
                        <Book book={book} onBookChange = {onBookShelfChange} />
                    </li>
                    ))
                }
            </ol>
        </div>
        </div>
    );
}

export default BookShelf;
