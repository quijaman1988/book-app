import React ,{Component} from 'react'
import './App.css'

class Read extends Component {
  render () {
    const {books} = this.props
    let read
    read =books.filter( (book) => book.shelf === "read" )
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
        </div>

      </div>
    )
  }
}

export default Read
