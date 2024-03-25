import React, { useState } from 'react';

import SaleReportAlpha from './SalesReportAlpha'; // Import sales report component
import StockReportAlpha from './StockReportAlpha'; // Import stock report component

const App = () => {
  const [showSalesReport, setShowSalesReport] = useState(true); // State to manage which report to display

  const toggleReport = (reportType) => {
    setShowSalesReport(reportType === 'Sales'); // Toggle between sales and stock reports
  };

  return (
    <div className="app-container">
       <div style={{ height: '20px' }}></div>
    <label 
  style={{
    display: 'block',
    margin: '0 auto',  // Center horizontally
    marginLeft: '20%', // Left margin of 20%
    fontSize: '20px'   // Adjust the font size as needed
  }}
>
  <b>Which report do you want to display?</b>
</label>



      <div style={{ height: '20px' }}></div>

      <div className="button-container">
      <button 
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '120px',
  }}
  className={showSalesReport ? 'active' : ''} 
  onClick={() => toggleReport('Sales')}
>
  Sales Report
</button>

<button 
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '120px',
  }}
  className={!showSalesReport ? 'active' : ''} 
  onClick={() => toggleReport('Stock')}
>
  Stock Report
</button>


      </div>
      <div className="report-container">
        {showSalesReport ? <SaleReportAlpha /> : <StockReportAlpha />}
      </div>
    </div>
  );
};

export default App;
