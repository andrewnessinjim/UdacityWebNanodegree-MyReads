import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

const userBookshelves = [{
  id: "currentlyReading",
  heading: "Currently Reading",
}, {
  id: "wantToRead",
  heading: "Want To Read"
}, {
  id: "read",
  heading: "Read"
}];

function UserBookshelves(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {userBookshelves.map(bookshelf => (
            <Bookshelf
              key={bookshelf.id}
              name={bookshelf.heading}
              books={props.books.filter(book => book.shelf === bookshelf.id)}
              onNotifyChange={props.onNotifyChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default UserBookshelves;