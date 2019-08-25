import React, { Component } from 'react'
import axios from 'axios'
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
      .then(res => this.setState({ words: res.data }))
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={e => this.setState({ tiles: e.target.value })}
            value={tiles}
          />
          <button>Find Words</button>
        </form>

        {
          words.length > 0 &&
          <SearchList onDelete={this.handleDelete} words={words} />
        }
      </div>
    )
  }
}