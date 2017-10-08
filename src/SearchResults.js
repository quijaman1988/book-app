import React ,{Component} from 'react'
import './App.css'

class SearchResults extends Component {

  state= {
    results:[]
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
       results: nextProps.results
     });
   }


  render() {
    const {results} = this.state
    return(
    <div>
      <br/>
      <br/>
      <br/>
      <ol className="books-grid">
        {results.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
    )
  }
}

export default SearchResults
