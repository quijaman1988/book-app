import React from 'react'
import update from 'immutability-helper';
import Header from './Header'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
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
    if (event.target.value === 'none') {
      return;
    }
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

getThumbnailImage = (book) => {
  if (book.imageLinks !== undefined) {
    return book.imageLinks.thumbnail;
  } else {
    return "none";
  }
}


  render() {
    return (
      <div>
        <Route exact path="/" render={ () => (
          <div>
            <Header
            headerTitle='My Reads'/>
            <CurrentlyReading
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
            />
            <WantToRead
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
            />
            <Read
            books={this.state.books}
            updateBook={this.updateBook}
            getThumbnail={this.getThumbnailImage}
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
