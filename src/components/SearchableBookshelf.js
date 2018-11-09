import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class SearchableBookshelf extends Component {

  state = {
    books: [],
    query: ""
  }

  onQueryChange = (event) => {
    const userQuery = event.target.value;
    this.setState({ query: userQuery });

    if (userQuery && userQuery.trim()) {
      BooksAPI.search(userQuery).then(books => {
        this.setState({ books: Array.isArray(books) ? books : [] });
      });
    } else {
      this.setState({ books: [] });
    }
  }

  addBooksToShelves(allBooks, userBooks) {
    return allBooks.map(book => {
      const userBook = userBooks.filter(userBook => userBook.id === book.id);
      if (userBook.length > 0) {
        book.shelf = userBook[0].shelf;
      }
      return book;
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onQueryChange} />
          </div>
        </div>
        <Bookshelf
          books={this.addBooksToShelves(this.state.books, this.props.userBooks)}
          padding={true}
          onNotifyChange={this.props.onNotifyChange}
        />
      </div>
    );
  }
}

export default SearchableBookshelf;