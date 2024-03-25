import React, { useState, useEffect } from 'react';
import './stockreport.css';
import logo from './Logo.jpg'; // Import your logo file
import { collection, getDocs, query, where } from 'firebase/firestore';
import firestore from './firebase';

const StockReportAlpha = () => {
  const [stockData, setStockData] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [totalSold, setTotalSold] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        let stockCollectionRef = collection(firestore, 'stock_alpha');
        let stockQuery = stockCollectionRef;

        // If a specific product is selected, add a filter to the query
        if (productCode !== '') {
          stockQuery = query(stockCollectionRef, where('productCode', '==', productCode));
        }

        const snapshot = await getDocs(stockQuery);
        const data = snapshot.docs.map(doc => doc.data());
        setStockData(data);

        // Calculate total purchased
        const total = data.reduce((acc, item) => acc + item.quantity, 0);
        setTotalPurchased(total);

        // Fetch total sold from Firebase
        const salesCollectionRef = collection(firestore, 'sales_alpha');
        const salesQuery = await getDocs(salesCollectionRef);
        const soldData = salesQuery.docs.map(doc => doc.data());
        const soldTotal = soldData.reduce((acc, item) => {
          if (productCode === '' || productCode === item.productCode) {
            return acc + item.quantity;
          }
          return acc;
        }, 0);
        setTotalSold(soldTotal);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [productCode]); // Fetch data whenever productCode changes

  const handleSearch = () => {
    // This function can remain empty since useEffect will handle fetching data
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
      case 'All Products':
        setProductCode(''); // Reset product code to empty string for all products
        break;
      default:
        setProductCode('');
    }
  };

  // Calculate remaining stock
  const remainingStock = totalPurchased - totalSold;

  return (
    <div className="stock-report-container">
      <div style={{ height: '200px' }}></div>

      <img src={logo} className='logo' alt="Logo"/>
      <h3>Stock Report Alpha</h3>

      <div className="options">
        <div className="option">
          <label>Product Name:</label>
          <select
            className="productName"
            value={productName}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            <option value="All Products">All Products</option>
            <option value="Coca cola">Coca cola</option>
            <option value="Fanta">Fanta</option>
            <option value="Sprite">Sprite</option>
            <option value="Pepsi">Pepsi</option>
            <option value="Mountain Dew">Mountain Dew</option>
          </select>
        </div>

        <div className="option">
          <label>Product Code:</label>
          <div className='abc'>
            <input
              type="text"
              id="productCode"
              value={productCode}
              readOnly
            />
          </div>
        </div>
        <div className='option'>
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="stock-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Total Purchased</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.productCode}</td>
                <td>{item.quantity}</td> {/* Assuming 'quantity' is the total purchased */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stock-summary">
        <p>Total Stock Purchased: {totalPurchased}</p>
        <p>Total Stock Sold: {totalSold}</p>
        <p>Remaining Stock: {remainingStock}</p>
      </div>
    </div>
  );
};

export default StockReportAlpha;

