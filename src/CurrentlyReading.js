import React ,{Component} from 'react'
import './App.css'

class CurrentlyReading extends Component {

  render () {
    const {books, updateBook} = this.props;
    let currentlyReading;
    currentlyReading =books.filter( (book) => book.shelf === "currentlyReading" );
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {currentlyReading.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => updateBook(e,book.id)} value={book.shelf} >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">&#10004; Currently Reading</option>
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
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
