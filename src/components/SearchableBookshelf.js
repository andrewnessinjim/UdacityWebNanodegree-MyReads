import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class SearchableBookshelf extends Component {

    state = {
        books: [],
        query: ""
    }

    onQueryChange = (event) => {
        this.setState({query: event.target.value})

        const userQuery = this.state.query;
        if(userQuery && userQuery.trim()) {
            BooksAPI.search(userQuery).then(books => this.setState({books}));
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onQueryChange} />

                    </div>
                </div>
                <Bookshelf
                    books={this.state.books.map(book => {
                        const userBook = this.props.userBooks.filter(userBook => userBook.id === book.id);
                        if(userBook.length > 0) {
                            book.shelf = userBook[0].shelf;
                        }
                        return book;
                    })}
                    padding={true}
                    onNotifyChange={this.props.onNotifyChange}
                />
            </div>
        );
    }
}

export default SearchableBookshelf;