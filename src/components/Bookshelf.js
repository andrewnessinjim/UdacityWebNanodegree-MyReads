import React from 'react';
import Book from './Book';

const Bookshelf = (props) => {
  return (
    <div className={"bookshelf " + (props.padding? "bookshelf-padding" : "")}>
      {props.name? (<h2 className="bookshelf-title">{props.name}</h2>) : ""}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <li key={book.id}>
              <Book
                data = {book}
                onNotifyChange = {props.onNotifyChange}
            />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf;