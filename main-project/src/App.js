import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import PurchasePage from './components/PurchasePage';
import LandingPageAlpha from './components/LandingPageAlpha';
import PurchasePageAlpha from './components/PurchasePageAlpha';
import LandingPageDelta from './components/LandingPageDelta';
import PurchasePageDelta from './components/PurchasePageDelta';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [branch,setBranch] = useState('hq'); // TO RUN THE PAGES CHANGE TO 'hq','alpha' or 'delta//

  const handleLogin = (username, password) => {
    // Simulate login logic here, replace with your actual authentication mechanism
    // For demonstration, I'm hardcoding username and password combinations
    if (username === 'user1' && password === 'pass1') {
      setBranch('hq');
      setCurrentPage('landing');
    } else if (username === 'user2' && password === 'pass2') {
      setBranch('alpha');
      setCurrentPage('landing_alpha');
    } else if (username === 'user3' && password === 'pass3') {
      setBranch('delta');
      setCurrentPage('landing_delta');
    } else {
      // Handle invalid login credentials
      alert('Invalid username or password');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage handleSubmit={handleLogin} />;
      case 'landing':
        return <LandingPage goToLogin={() => setCurrentPage('login')} />;
      case 'purchase':
        return <PurchasePage goToLanding={() => setCurrentPage('landing')} />;
      case 'landing_alpha':
        return <LandingPageAlpha goToLogin={() => setCurrentPage('login_alpha')} />;
      case 'purchase_alpha':
        return <PurchasePageAlpha goToLanding={() => setCurrentPage('landing_alpha')} />;
      case 'landing_delta':
        return <LandingPageDelta goToLogin={() => setCurrentPage('login_delta')} />;
      case 'purchase_delta':
        return <PurchasePageDelta goToLanding={() => setCurrentPage('landing_delta')} />;
      default:
        return null; // Return null for any unknown page
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;

