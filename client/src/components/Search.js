import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import SearchList from './SearchList'

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tiles: '',
      words: []
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { tiles } = this.state
    axios.get(`/api/search/${tiles}`)
      .then(res => {
        this.setState({ words: res.data })
      })
  }

  handleDelete = (word) => {
    const { words } = this.state
    axios.delete(`/api/words/${word}`)
      .then(res => this.setState({ words: words.filter(w => w !== word) }))
  }

  render() {
    const { tiles, words } = this.state

    return (
      <div>
        <h4>Search</h4>
        <p>Search your database for all anagrams of any given tiles</p>
        <p>Found words can be deleted from your database</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={e => this.setState({ tiles: e.target.value })}
            value={tiles}
          />
          <br />
          <br />
          <Button color="primary">Find words</Button>
        </form>

        {
          words.length > 0 &&
          <SearchList onDelete={this.handleDelete} words={words} />
        }
      </div>
    )
  }
}