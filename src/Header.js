import React ,{Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Header extends Component {
  static propTypes = {
    headerTitle: PropTypes.string.isRequired
  }

  render() {
    const title = this.props;
    return (
      <div className="list-books-title">
        <h1>{title.headerTitle}</h1>
      </div>
    )
  }
}

export default Header
