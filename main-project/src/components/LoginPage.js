import React, { useState } from 'react';
import logo from './Logo.jpg'; // Import your logo file

function LoginPage({ handleSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
   // props.goToLanding();
   // Call handleSubmit prop with username and password
   handleSubmit(username, password);
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} /> {/* Display your logo */}
      <h1 style={styles.title}>Login Page</h1>
      <form onSubmit={handleFormSubmit} style={styles.form}>
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
    marginBottom: '20px',
    fontSize: '24px',
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
