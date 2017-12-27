import React ,{Component} from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class Read extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  render () {
    const {books, updateBook, getThumbnail} = this.props;
    let read;
    read =books.filter( (book) => book.shelf === "read" );
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {read.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnail(book)})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => updateBook(e,book.id)} value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">&#10004; Read</option>
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

export default Read
