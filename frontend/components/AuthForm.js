import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //allow switching between components
import axios from 'axios' //

export default function AuthForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // set for server validation errors

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const { data } = await axios.post(
        '/api/auth/login', //sets a path to the endpoint
        { username, password } // obtained from component state
      )
      localStorage.setItem('token', data.token)
      navigate('/cereals')
    } catch (err) {
      setError(
        err?.response?.data?.message || 'An error occured please write this code again'
      )
    }
    // POST username and pasword to the login endpoint
    // if fail, set error message in state so it renders
    // if OK
    //  1 -- save token to brower's local storage
    //  2 -- navigate user to the /cereals route
  }

  return (
    <div className="container">
      <div aria-live="polite"></div>
      <div aria-live="assertive" style={{ color: 'red' }}>{error}</div>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
