import React ,{Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class CurrentlyReading extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render () {
    const {books, updateBook, getThumbnail, shelf, getTitle} = this.props;
    let currentlyReading;
    currentlyReading =books.filter( (book) => book.shelf === shelf );
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{getTitle(shelf)}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {currentlyReading.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnail(book)})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => updateBook(e,book.id)} value={book.shelf} >
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
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
          Add Contact
          </Link>
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
