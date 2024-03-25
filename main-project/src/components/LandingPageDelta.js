import React, { useState } from 'react';
import logo from './Logo.jpg'; // Import your logo file
import PurchasePageDelta from './PurchasePageDelta';
import SellPageDelta from './SellPageDelta';
import SaleReportDelta from './SalesReportDelta';
import StockReportDelta from './StockReportDelta';

function LandingPage() {
  const [currentPage, setCurrentPage] = useState(null); // Initially no page is shown

  const handleButtonClick = (page) => {
    setCurrentPage(page); // Update current page based on button click
  };

  const handleSignOut = () => {
    // Redirect user to the login page
    window.location.href = '/login'; // Redirect to the login page
  };


  const renderContent = () => {
    switch (currentPage) {
      case 'purchaseAlpha': // Render PurchasePageAlpha when currentPage is 'purchaseAlpha'
        return <PurchasePageDelta />;
      case 'sell':
        return <SellPageDelta/>;
      case 'salesReport':
        return <SaleReportDelta/>;
      case 'stockReport':
        return <StockReportDelta/>;
      default:
        return (
          <div style={styles.defaultContent}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <p style={styles.branchName}>Branch Delta</p>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.headerContent}>
          <h1 style={styles.companyName}>Patel's Dhaba</h1>
          <p style={styles.branchName}>Branch Delta</p>
        </div>
        <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          {/* Modify the onClick handler to set currentPage to 'purchaseAlpha' */}
          <button onClick={() => handleButtonClick('purchaseAlpha')} style={{ ...styles.button, marginTop: '30px' }}>Purchase From HQ</button>
          <button onClick={() => handleButtonClick('sell')} style={styles.button}>Sell</button>
          <button onClick={() => handleButtonClick('salesReport')} style={{ ...styles.button, marginTop: '30px' }}>Sales Report</button>
          <button onClick={() => handleButtonClick('stockReport')} style={styles.button}>Stock Report</button>
        </div>
        <div style={styles.line}></div> {/* Line between columns */}
        <div style={{ ...styles.rightColumn, backgroundColor: 'white' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', // Change background color to black
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    position: 'fixed', // Fixed position to keep it at the top
    top: '0', // Top of the viewport
    left: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space in between
    marginBottom: '15px',
    backgroundColor: 'white', // Change header background color to white
    padding: '10px 20px',
  },
  logo: {
    width: '100px', // Increase the width of the logo
    marginRight: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align items at the center horizontally
  },
  companyName: {
    fontSize: '20px', // Reduce font size for company name
    fontWeight: 'bold',
    margin: '0',
    color: 'black', // Change font color to black
  },
  branchName: {
    fontSize: '15px', // Reduce font size for branch name
    margin: '5px 0', // Add margin top and bottom
    textAlign: 'center', // Center align the branch name
    color: 'black', // Change font color to black
  },
  signOutButton: {
    color: 'black', // Change font color to black
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px', // Add padding to button
    cursor: 'pointer',
    backgroundColor: 'white', // Change button background color to white
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'flex-start', // Align items at the start of the flex container
    width: '100%',
    minHeight: 'calc(100vh - 100px)', // Adjusted min-height to ensure all content fits within the viewport
    overflowY: 'auto',
    marginTop: '80px', // Adjust margin top to account for fixed header
  },
  leftColumn: {
    flex: '1',
    marginRight: '20px', // Add margin right for spacing
  },
  rightColumn: {
    flex: '2',
    marginLeft: '20px', // Add margin left for spacing
  },
  defaultContent: {
    textAlign: 'center',
  },
  button: {
    display: 'block',
    marginBottom: '20px', // Add margin bottom between buttons
    padding: '15px 20px', // Adjust padding to make buttons bigger
    width: '100%',
    textAlign: 'center',
    color: 'black', // Change font color to black
    border: '1px solid white', // Change border color to white
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px', // Adjust font size to make buttons bigger
    backgroundColor: 'white', // Change button background color to white
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  line: {
    width: '1px',
    height: '130%',
    backgroundColor: 'white', // Change line color to white
    margin: '0 20px', // Adjust margin to position the line
  },
};

export default LandingPage;
