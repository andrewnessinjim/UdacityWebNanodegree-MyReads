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
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  onNotifyChange = (bookId, bookShelf) => {
    const changedBookIndex = this.state.books.findIndex(book => book.id === bookId);

    if(changedBookIndex >= 0) { //If book is alreaded loaded, just change it's shelf
      this.setState((prevState => {
        prevState.books[changedBookIndex].shelf = bookShelf;
        return {
          books: prevState.books
        };
      }))
    } else { //Else, load that one book from backend
      BooksAPI.get(bookId).then(book => {
        book.shelf = bookShelf;
        this.setState(prevState => ({
          books: prevState.books.concat(book)
        }));
      });
    }
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