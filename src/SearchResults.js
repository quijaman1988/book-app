import React ,{Component} from 'react'
import './App.css'

class SearchResults extends Component {

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
    const books = this.props.booksOnShelf
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
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
          </li>
        ))}

      </ol>
            )}
    </div>
    )
  }
}

export default SearchResults
