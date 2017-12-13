import React ,{Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'

class WantToRead extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  render () {
    const {books, updateBook} = this.props;
    let wantToRead;
    wantToRead =books.filter( (book) => book.shelf === "wantToRead" );
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {wantToRead.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => updateBook(e,book.id)} value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">&#10004; Want to Read</option>
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
        </div>

      </div>
    )
  }
}

export default WantToRead
