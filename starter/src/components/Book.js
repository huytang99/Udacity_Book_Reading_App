
function Book({book, onBookChange}) {

    const handleChange = (event) => {
        onBookChange(book, event.target.value);
    };

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 192,
                    backgroundImage:
                        `url(${book.imageLinks ?
                            book.imageLinks.thumbnail :
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrlF_KqvciTA685q2MzXhl0LOAjtWDwZg8A&usqp=CAU'
                        })`,
                    }}
                />


                <div className="book-shelf-changer">
                    <select value={book.shelf ? book.shelf : 'none'} onChange={handleChange} >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Completed</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>

            <div className="book-title">
                {book.title}
            </div>

            <div className="book-authors">
                {book.authors ? book.authors.join(', ') : 'Anonymous'}
            </div>
        </div>
    );
}

export default Book;