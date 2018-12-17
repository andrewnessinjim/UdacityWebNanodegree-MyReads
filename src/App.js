import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchableBookshelf from './components/SearchableBookshelf';
import UserBookShelves from './components/UserBookshelves';
import { changeBookshelf, addBookToShelf } from './reducers/bookshelf_reducers';

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
      this.setState(prevState => 
        changeBookshelf(prevState, changedBookIndex, bookShelf)
      );
    } else { //Else, load that one book from backend
      BooksAPI.get(bookId).then(book => {
        this.setState(prevState => 
          addBookToShelf(prevState, book, bookShelf)
        );
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