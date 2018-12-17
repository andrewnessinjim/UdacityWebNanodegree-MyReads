function changeBookshelf(previousState, bookId, bookShelf) {
    const books = [...previousState.books];
    books[bookId].shelf = bookShelf;

    return {books}
}

function addBookToShelf(previousState, book, bookShelf) {
    const newBook = {...book};
    newBook.shelf = bookShelf;
    return {books: previousState.books.concat(book)}
}

export {changeBookshelf, addBookToShelf};