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


updateQuery = (query) => {
  this.setState({query:query.trim()})
    if (query !== '') {
      BooksAPI.search(query).then((results) => {
        if(!results.length) {
          this.setState({ results: []})
        } else {
        this.setState({ results: results})
        }
      })
    } else {
      this.setState({ results: []})
    }
}

  render () {
    const updateQuery = this.updateQuery
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
              onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <SearchResults
        results={this.state.results}/>
      </div>
    )
  }
}

export default Read
