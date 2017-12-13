import React ,{Component} from 'react'
import './App.css'
import SearchResults from './SearchResults'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class Read extends Component {
state = {
    query:'',
    results:[]
  }

  /**
  * @description Method to make an AJAX call to the Book API as soon as the user types
  * in the search bar. We add the shelf property to the results and check if the books
  * are already in the shelf
  * @param {string} query - Query typed by the user in the search bar
  * @param {method} checkforShelf - Method to check if the books is already in the booksOnShelf
  * @param {method} addProperty - Method add shelf property to results json
  * @param {array} books - Array of JSONs containing original books in the shelves
  */
updateQuery = (query, checkforShelf, addProperty, books) => {

    this.setState({query:query})
    if (query !== '') {
      BooksAPI.search(query).then((results) => {
        if(results.error === 'empty query') {
          this.setState({ results: []});
        } else {
        results = addProperty(results);
        this.setState({ results: checkforShelf(results,books)});
        }
      }
    ).catch((err) => {
      this.setState({results : []});
    })
  } else {
    this.setState({results : []});
  }
}

  render () {
    const updateQuery = this.updateQuery
    const {books, addPropertyToJSON, checkforShelf, moveBookToShelf} = this.props
    const {query} = this.state
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => updateQuery(event.target.value, checkforShelf, addPropertyToJSON, books)}
              />
            </div>
          </div>
        </div>
        <SearchResults
          results={this.state.results}
          booksOnShelf={books}
          addPropertyToJSON={addPropertyToJSON}
          checkforShelf={checkforShelf}
          moveBookToShelf={moveBookToShelf}
        />
      </div>
    )
  }
}

export default Read
