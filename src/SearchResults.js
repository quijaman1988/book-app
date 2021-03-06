import React ,{Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'

class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
    addPropertyToJSON: PropTypes.func.isRequired,
    checkforShelf: PropTypes.func.isRequired,
    moveBookToShelf: PropTypes.func.isRequired,
  }
  state= {
    results:[]
  }

  componentWillReceiveProps(propstoReceived) {
     this.setState({
       results: propstoReceived.results,
     });
   }

   /**
   * @description Method to check that results is not empty
   * @param {array} obj - Results array
   */
   checkForEmpty = (obj) => {
     if (obj === "undefined") {
       return [];
     }
     return obj;
   }

render() {
    let {results} = this.state
    const moveBookToShelf = this.props.moveBookToShelf;
    const books = this.props.booksOnShelf;
    const getThumbnail = this.props.getThumbnail;
    results = this.checkForEmpty(results)
    return(
    <div>
      <br/>
      <br/>
      <br/>
      {results !== "undefined" && (
      <ol className="books-grid">
        {results.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnail(book)})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => moveBookToShelf(e,books,book)}   value={book.shelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </li>
        ))}

      </ol>
      )}
    </div>
    )
  }
}

export default SearchResults
