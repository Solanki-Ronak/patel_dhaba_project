import React, { useState } from 'react';
import logo from './Logo.jpg'; // Import your logo file

function LoginPage({ goToLanding }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Username:', username, 'Password:', password);
    // After successful login, navigate to the landing page alpha
    goToLanding('landing_alpha');
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} /> {/* Display your logo */}
      <h1 style={styles.title}>Welcome to Branch Alpha</h1> {/* Add welcome message */}
      <h2 style={styles.subtitle}>Login Page</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'black', // Set background color to black
    color: 'white', // Set text color to white
  },
  logo: {
    width: '200px', // Adjust size as needed
    marginBottom: '20px',
  },
  title: {
    marginBottom: '10px', // Adjust margin
    fontSize: '28px', // Increase font size
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '20px', // Increase font size
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    width: '250px',
    backgroundColor: 'white', // Set input background color to white
    color: 'black', // Set input text color to black
    border: 'none',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'black', // Set button background color to black
    color: 'white', // Set button text color to white
    border: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LoginPage;
