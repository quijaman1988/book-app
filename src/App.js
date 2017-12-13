import React from 'react'
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
    let tempBooks = this.state.books;
    for (var key in tempBooks) {
      if (tempBooks[key].id === id) {
        tempBooks[key].shelf = event.target.value;
        continue;
      }
      this.setState({books : tempBooks});
    }
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
  results.push(book);
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
            />
            <WantToRead
            books={this.state.books}
            updateBook={this.updateBook}
            />
            <Read
            books={this.state.books}
            updateBook={this.updateBook}
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
          />
          </div>
        )} />
      </div>
    )

  }
}

export default App;
