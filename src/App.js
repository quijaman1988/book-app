import React from 'react'
import Header from './Header'
import CurrentlyReading from './CurrentlyReading'
import * as BooksAPI from './utils/BooksAPI'

import './App.css'

class App extends React.Component {
  state = {
    books:[],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
      console.log(this.state.books)
    })
  }

  render() {
    return (
      <div>
        <Header />
        <CurrentlyReading />
      </div>
    )

  }
}

export default App;
