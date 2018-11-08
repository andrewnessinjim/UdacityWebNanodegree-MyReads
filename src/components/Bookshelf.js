import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    return (
      <div className={"bookshelf " + (this.props.padding? "bookshelf-padding" : "")}>
        {this.props.name? (<h2 className="bookshelf-title">{this.props.name}</h2>) : ""}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  data = {book}
              />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;