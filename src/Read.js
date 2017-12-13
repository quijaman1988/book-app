import React ,{Component} from 'react'
import './App.css'
import { Link } from 'react-router-dom';

class Read extends Component {
  render () {
    const {books, updateBook} = this.props;
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
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
