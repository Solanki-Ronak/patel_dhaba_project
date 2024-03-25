import React, { useState, useEffect } from 'react';
import './salesreport.css';
import logo from './Logo.jpg'; // Import your logo file
import { collection, getDocs, query, where } from 'firebase/firestore';
import firestore from './firebase';

const SaleReportHQ = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [totalQuantitySold, setTotalQuantitySold] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let salesCollectionRef = collection(firestore, 'sales_hq');
        let salesQuery = salesCollectionRef;

        if (startDate !== '') {
          salesQuery = query(salesQuery, where('sellDate', '>=', startDate));
        }
        if (endDate !== '') {
          salesQuery = query(salesQuery, where('sellDate', '<=', endDate));
        }
        if (productName !== '') {
          salesQuery = query(salesQuery, where('productName', '==', productName));
        }
        if (productCode !== '') {
          salesQuery = query(salesQuery, where('productCode', '==', productCode));
        }
        if (customerId !== '') {
          salesQuery = query(salesQuery, where('customerId', '==', customerId));
        }

        const snapshot = await getDocs(salesQuery);
        const data = snapshot.docs.map(doc => doc.data());
        setSalesData(data);

        // Calculate total quantity sold and total sales
        let totalQuantity = 0;
        let totalSalesAmount = 0;
        data.forEach(sale => {
          totalQuantity += sale.quantity;
          totalSalesAmount += parseFloat(sale.total);
        });
        setTotalQuantitySold(totalQuantity);
        setTotalSales(totalSalesAmount.toFixed(2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, productName, productCode, customerId]);

  const handleSearch = () => {
    // Triggered when the search button is clicked
    // Fetching data is handled in the useEffect hook
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProductName(selectedProduct);
    // Logic to generate product code based on selected product
    switch (selectedProduct) {
      case 'Coca cola':
        setProductCode('CC001');
        break;
      case 'Fanta':
        setProductCode('FT001');
        break;
      case 'Sprite':
        setProductCode('SP001');
        break;
      case 'Pepsi':
        setProductCode('PS001');
        break;
      case 'Mountain Dew':
        setProductCode('MD001');
        break;
      default:
        setProductCode('');
    }
  };

  return (
    <div className="sale-report-container">
      <img src={logo} className='logo' alt="Logo"/>
      <h3> Sales Report Headquarter</h3>
      
      <div className="options">
        <div className="option">
          <label>From:</label>
          <div className='from'>
            <input type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        <div className="option">   
          <label>To:</label>
          <div className='to'>
            <input type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <br></br><br/>

        <div className='prodid'>
          <div className="option">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Product Name:</label>

            <select
                className="productName"
                value={productName}
                onChange={handleProductChange}
              >
                <option value="">Select Product</option>
                <option value="All Products"> All Products</option>
                <option value="Coca cola">Coca cola</option>
                <option value="Fanta">Fanta</option>
                <option value="Sprite">Sprite</option>
                <option value="Pepsi">Pepsi</option>
                <option value="Mountain Dew">Mountain Dew</option>
              </select>
          </div>
        </div>

        <div className="option">
          <label>Product Code:</label>
          <div className='productCode'>
            <input
              type="text"
              id="productCode"
              value={productCode}
              readOnly
            />
          </div>
        </div>

        <div className="option">
          <label>Customer ID:</label>
          <div className="customerID">
            <input type="text"
              value={customerId} 
              onChange={(e) => setCustomerId(e.target.value)} />
          </div>
        </div>
        
        <div className='option'>
          <br/>
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <br/>
      <br/>

      <div className="sales-table-container"> {/* Container for the table */}
        <div className="sales-table">
          <table>
            <thead>
              <tr>
                <th>Sell Date</th> {/* New column for sell date */}
                <th>Product Name</th>
                <th>Product Code</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.sellDate}</td> {/* Display sell date */}
                  <td>{sale.productName}</td>
                  <td>{sale.productCode}</td>
                  <td>{sale.date}</td>
                  <td>{sale.customerId}</td>
                  <td>{sale.price}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Display total quantity sold and total sales */}
      <div className="total-info">
        <p>Total Quantity Sold: {totalQuantitySold}</p>
        <p>Total Sales: {totalSales}</p>
      </div>
    </div>
  );
};

export default SaleReportHQ;
