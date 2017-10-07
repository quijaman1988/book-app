import React ,{Component} from 'react'
import './App.css'

class Header extends Component {

  render() {
    const title = this.props
    console.log(title)
    return (
      <div className="list-books-title">
        <h1>{title.headerTitle}</h1>
      </div>
    )
  }
}

export default Header
