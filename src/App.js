import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchableBookshelf from './components/SearchableBookshelf';
import UserBookShelves from './components/UserBookshelves';

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
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <UserBookShelves
              books={books}
              onNotifyChange={this.onNotifyChange}
            />
          )} />

          <Route path="/search" render={() => (
            <SearchableBookshelf
              onNotifyChange={this.onNotifyChange}
              userBooks={books.map(book => ({ id: book.id, shelf: book.shelf }))} />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp