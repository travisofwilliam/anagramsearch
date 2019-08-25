import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from './Search'
import Add from './Add'

class App extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <h1>Word Finder</h1>
        <hr />
        <Search />
        <hr />
        <Add />
      </div>
    )
  }
}

export default App;
