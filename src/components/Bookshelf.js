import React from 'react';
import Book from './Book';

const Bookshelf = (props) => {
  const { padding, name, books, onNotifyChange } = props;

  return (
    <div className={"bookshelf " + (padding ? "bookshelf-padding" : "")}>
      {name ? (<h2 className="bookshelf-title">{name}</h2>) : ""}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book
                data={book}
                onNotifyChange={onNotifyChange}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf;