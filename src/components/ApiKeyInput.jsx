import { useState } from 'react'

function ApiKeyInput({ onSubmit }) {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (apiKey.trim()) {
      onSubmit(apiKey.trim())
    }
  }

  return (
    <div className="api-key-container">
      <h2>Enter Your OpenAI API Key</h2>
      <p>
        Your API key is stored locally in your browser and never sent to our
        servers. You can get an API key from{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#00d4ff' }}
        >
          OpenAI's website
        </a>
        .
      </p>
      <form className="api-key-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            autoComplete="off"
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" disabled={!apiKey.trim()}>
          Start Learning
        </button>
      </form>
    </div>
  )
}

export default ApiKeyInput
