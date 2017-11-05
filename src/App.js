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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
  }

  updateBook = (event, id) => {
    if (event.target.value === 'none') {
      return;
    }
    let tempBooks = this.state.books
    for (var key in tempBooks) {
      if (tempBooks[key].id === id) {
        tempBooks[key].shelf = event.target.value
        continue
      }
      this.setState({books : tempBooks})
    }
}

addPropertyToJSON = (results) => {
  for(var i = 0; i < results.length; i++) {
    results[i].shelf = "none"
  }
  return results
}

checkforShelf = (results, books) => {
  for(let i = 0; i < results.length; i++) {
      for(let j = 0; j < books.length; j++) {
        if (results[i].id === books[j].id ) {
          results[i].shelf = books[j].shelf
        }
      }
    }
  // console.log("IN");
  return results
}

moveBookToShelf = (event,results,book) => {
  book.shelf = event.target.value
  console.log(book.shelf)
  results.push(book)
  // this.setState({books : results})
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
