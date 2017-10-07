import React from 'react'
import Header from './Header'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'

class App extends React.Component {
  state = {
    books:[],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={ () => (
          <div>
            <Header />
            <CurrentlyReading
            books={this.state.books}
            />
            <WantToRead
            books={this.state.books}
            />
            <Read
            books={this.state.books}
            />
          </div>
        )} />

        <Route exact path="/search" render={ () => (
          <h1>Yo</h1>
        )} />
      </div>
    )

  }
}

export default App;
