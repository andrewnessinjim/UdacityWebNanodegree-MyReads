import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf';
import SearchableBookshelf from './components/SearchableBookshelf';
import { Link, Route } from 'react-router-dom';

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

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.updateBooks();
  }

  onNotifyChange = () => {
    this.updateBooks();
  }

  updateBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {userBookshelves.map(bookshelf => (
                  <Bookshelf
                    name={bookshelf.heading}
                    books={this.state.books.filter(book => book.shelf === bookshelf.id)}
                    onNotifyChange={this.onNotifyChange}
                  />
                ))}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <SearchableBookshelf
            onNotifyChange={this.onNotifyChange}
            userBooks={this.state.books.map(book => ({ id: book.id, shelf: book.shelf }))} />
        )} />
      </div>
    )
  }
}

export default BooksApp