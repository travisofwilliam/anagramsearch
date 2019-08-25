import React from 'react'
import axios from 'axios'

export default class Add extends React.component {
  state = {
    wordList: ''
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const { wordList } = this.state
    const words = wordList.split('\n').filter(w => w.length > 0)

    axios.post(`/api/words`, {
      words
    })
    this.setState({
      wordList: ''
    })
  };

  render() {
    const { wordList } = this.state

    return (
      <div>
        <h1>Add words</h1>
        <form onSubmit={ this.handleSubmit }>
            <textarea 
              onChange={e => this.setState({ wordList: e.target.value })}
              value={wordList}
            />
            <button>Add words</button>
        </form>
      </div>
    )
  }
}