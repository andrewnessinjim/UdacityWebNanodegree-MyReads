import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf';
import SearchableBookshelf from './components/SearchableBookshelf';
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.updateBooks();
  }

  onNotifyChange= () => {
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
                <Bookshelf
                  name="Currently Reading"
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  onNotifyChange={this.onNotifyChange}
                />
                <Bookshelf
                  name="Want to Read"
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                  onNotifyChange={this.onNotifyChange}
                />
                <Bookshelf
                  name="Read"
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  onNotifyChange={this.onNotifyChange}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => {
          return <SearchableBookshelf
          onNotifyChange={this.onNotifyChange}
          userBooks={this.state.books.map(book => ({id: book.id, shelf: book.shelf}))}/>
        }}
        />
      </div>
    )
  }
}

export default BooksApp
