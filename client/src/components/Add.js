import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'

export default class Add extends React.Component {
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
        <h4>Add Words</h4>
        <p>Add words to your database:</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={e => this.setState({ wordList: e.target.value })}
            value={wordList}
          />
          <br />
          <Button color="primary">Add words</Button>
        </form>
      </div>
    )
  }
}