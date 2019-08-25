import React from 'react'

const SearchList = ({ onDelete, words }) => (
  <div>
    <h4>Found {words.length} word{words.length === 1 ? '' : 's'}</h4>

    {
      words.map(word =>
        (
          <p key={word}>{word}
            <button
              onClick={e => {
                e.preventDefault()
                onDelete(word)
              }}>
              Delete
          </button>
          </p>
        )
      )
    }
  </div>
)

export default SearchList