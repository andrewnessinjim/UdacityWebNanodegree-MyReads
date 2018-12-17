import { addBookToShelf } from "../bookshelf_reducers";

const deepFreeze = require('deep-freeze');

test('Reducer adds book to shelf', () => {
    const previousState = {
        books: [{
            id: 1,
            name: "Android"
        }]
    }

    const newBook = {
        id: 2,
        name: "React"
    }

    const bookShelf = 'Reading';
    const expectedNewState = {
        books: [...previousState.books, newBook]
    }

    deepFreeze(previousState);
    deepFreeze(newBook);

    const newState = addBookToShelf(previousState, newBook, bookShelf);
    expect(
        newState
    ).toEqual(expectedNewState);

});