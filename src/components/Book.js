import React from 'react';
import * as BooksAPI from '../BooksAPI';

const Book = (props) => {
  const book = props.data;
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 192,
          backgroundImage: book.imageLinks && book.imageLinks.thumbnail ? `url(${book.imageLinks.thumbnail})` : "none"
        }}></div>
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {
              onShelfChange(event, props.onNotifyChange)
            }}
            bookid={book.id}
            defaultValue={(book.shelf ? book.shelf : 'none')}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">{(book.shelf === 'currentlyReading' ? "✓ " : "")}Currently Reading</option>
            <option value="wantToRead">{(book.shelf === 'wantToRead' ? "✓ " : "")}Want to Read</option>
            <option value="read">{(book.shelf === 'read' ? "✓ " : "")}Read</option>
            <option value="none">{(book.shelf === undefined ? "✓ " : "")}None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors : ""}</div>
    </div>
  );
}

const onShelfChange = (event, onNotifyChange) => {
  const bookId = event.target.getAttribute('bookid');
  const bookShelf = event.target.value;

  BooksAPI.update({id: bookId}, bookShelf)
  .then(onNotifyChange(bookId, bookShelf));
}

export default Book;