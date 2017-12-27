import React from 'react'
import update from 'immutability-helper';
import Header from './Header'
import Shelf from './Shelf'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'

class App extends React.Component {
  state = {
    books:[]
  }

  /**
  * @description Ajax call to obtain all books
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }

  /**
  * @description Method to change book between shelves
  * @param {event} event - The shelve to to which the book is going to be moved. Could be none
  * @param {string} id - Id of the book
  */
  updateBook = (event, id) => {
    let updatedBooks = [];

    for (var key in this.state.books) {
      if (this.state.books[key].id === id) {
        // We use immutability-helper to avoid modifying the state directly
        let tempBook = update(this.state.books[key], {shelf: {$set:event.target.value }});
        BooksAPI.update(tempBook, event.target.value );
        updatedBooks = update(this.state.books, { $splice: [[key, 1, tempBook]] });
        continue;
      }
    }
    this.setState({books : updatedBooks});
}

/**
* @description Method to add 'shelf property to results JSON obtained in search'
* @param {array} results -Results array obatined in search
*/
addPropertyToJSON = (results) => {
  for(var i = 0; i < results.length; i++) {
    results[i].shelf = "none";
  }
  return results;
}

/**
* @description Method to check if a book that came up in the search exists in the shelf
* @param {array} results - Search results
* @param {string} books - Books in the shelf
*/
checkforShelf = (results, books) => {
  for(let i = 0; i < results.length; i++) {
      for(let j = 0; j < books.length; j++) {
        if (results[i].id === books[j].id ) {
          results[i].shelf = books[j].shelf;
        }
      }
    }
  return results;
}

/**
* @description Method to move a book from search to shelf
* @param {event} events - The shelve to to which the book is going to be moved. Could be none
* @param {array} results - Search results
* @param {string} books - Books in the shelf
*/
moveBookToShelf = (event,results,book) => {
  book.shelf = event.target.value;
  const tempResults = update(results,{$push:[book]})
  BooksAPI.update(book, event.target.value);
  this.setState({books : tempResults})
}

/**
* @description Method to safely obtain thumbail image link. If the book does not have any it return "none"
* @param {JSON} book - The current book that we are obatining the thumbnail link
*/
getThumbnailImage = (book) => {
  if (book.imageLinks !== undefined) {
    return book.imageLinks.thumbnail;
  } else {
    return "http://via.placeholder.com/128x193?text=No%20Cover";
  }
}

/**
* @description Method to obtain the current book shelf to render appropriate title
* @param {String} shelf - The shelf we are working with
*/
getShelfTitle = (shelf) => {
  switch(shelf) {
    case "currentlyReading":
        return "Currently Reading";
    case "wantToRead":
        return "Want to Read";
    case "read":
        return "Read";
    default:
        return ""
  }
}

  render() {
    return (
      <div>
        <Route exact path="/" render={ () => (
          <div>
            <Header
            headerTitle='My Reads'/>
            <Shelf
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
            shelf='currentlyReading'
            getTitle={this.getShelfTitle}
            getCheckMark={this.getCheckMark}
            />
            <Shelf
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
            shelf='wantToRead'
            getTitle={this.getShelfTitle}
            getCheckMark={this.getCheckMark}
            />
            <Shelf
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
            shelf='read'
            getTitle={this.getShelfTitle}
            getCheckMark={this.getCheckMark}
            />
          </div>
        )} />

        <Route exact path="/search" render={ () => (
          <div>
          <Search
            books={this.state.books}
            addPropertyToJSON={this.addPropertyToJSON}
            checkforShelf={this.checkforShelf}
            moveBookToShelf={this.moveBookToShelf}
            getThumbnail={this.getThumbnailImage}
          />
          </div>
        )} />
      </div>
    )

  }
}

export default App;
