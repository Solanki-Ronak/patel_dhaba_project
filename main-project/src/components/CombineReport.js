import React, { useState, useEffect } from 'react';
import './stockreport.css';
import logo from './Logo.jpg'; // Import your logo file
import { collection, getDocs } from 'firebase/firestore';
import firestore from './firebase';

const StockReporthq = () => {
 const [selectedProduct, setSelectedProduct] = useState('All');
 const [showData, setShowData] = useState(false);
 const [totalPurchased, setTotalPurchased] = useState(0);
 const [totalSold, setTotalSold] = useState(0);
 const [totalRemainingAlpha, setTotalRemainingAlpha] = useState(0);
 const [totalSalesAlpha, setTotalSalesAlpha] = useState(0);
 const [totalRemainingDelta, setTotalRemainingDelta] = useState(0);
 const [totalSalesDelta, setTotalSalesDelta] = useState(0);
 const [totalSoldHQ, setTotalSoldHQ] = useState(0);
 const [totalRemainingHQ, setTotalRemainingHQ] = useState(0);
 const [totalSalesHQ, setTotalSalesHQ] = useState(0);
 const [totalRemainingAllBranches, setTotalRemainingAllBranches] = useState(0);
 const [totalSoldAllBranches, setTotalSoldAllBranches] = useState(0);
 const [totalSalesAllBranches, setTotalSalesAllBranches] = useState(0);
 const [totalPurchasedAlpha, setTotalPurchasedAlpha] = useState(0);
const [totalSoldAlpha, setTotalSoldAlpha] = useState(0);

const [totalPurchasedDelta, setTotalPurchasedDelta] = useState(0);
const [totalSoldDelta, setTotalSoldDelta] = useState(0);





 useEffect(() => {
    async function fetchData() {
      try {
        let productCode = '';
        switch (selectedProduct) {
          case 'Coca cola':
            productCode = 'CC001';
            break;
          case 'Fanta':
            productCode = 'FT001';
            break;
          case 'Sprite':
            productCode = 'SP001';
            break;
          case 'Pepsi':
            productCode = 'PS001';
            break;
          case 'Mountain Dew':
            productCode = 'MD001';
            break;
          case 'All':
            productCode = '';
            break;
          default:
            productCode = '';
        }

        const hqPurchasedQuery = await getDocs(collection(firestore, `hq_products_purchased`));
        const totalPurchased = hqPurchasedQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);

        const alphaStockQuery = await getDocs(collection(firestore, `stock_alpha`));
        const totalPurchasedAlpha = alphaStockQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);

        const alphaSalesQuery = await getDocs(collection(firestore, `sales_alpha`));
        const totalSoldAlpha = alphaSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);
        const totalSalesAlpha = alphaSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().total);
          }
          return acc;
        }, 0);

        const deltaStockQuery = await getDocs(collection(firestore, `stock_beta`));
        const totalPurchasedDelta = deltaStockQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);

        const deltaSalesQuery = await getDocs(collection(firestore, `sales_beta`));
        const totalSoldDelta = deltaSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);
        const totalSalesDelta = deltaSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().total);
          }
          return acc;
        }, 0);

        const hqSalesQuery = await getDocs(collection(firestore, `sales_hq`));
        const totalSoldHQ = hqSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);
        const totalSalesHQ = hqSalesQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().total);
          }
          return acc;
        }, 0);

        const hqRemainingQuery = await getDocs(collection(firestore, `hq_products_remaining`));
        const totalRemainingHQ = hqRemainingQuery.docs.reduce((acc, doc) => {
          if (productCode === '' || doc.data().productCode === productCode) {
            return acc + parseFloat(doc.data().quantity);
          }
          return acc;
        }, 0);

        const totalRemainingAllBranches = totalPurchasedAlpha - totalSoldAlpha + totalPurchasedDelta - totalSoldDelta + totalRemainingHQ;
        const totalSoldAllBranches = totalSoldAlpha + totalSoldDelta + totalSoldHQ;
        const totalSalesAllBranches = totalSalesAlpha + totalSalesDelta + totalSalesHQ;

        setTotalPurchasedAlpha(totalPurchasedAlpha);
setTotalSoldAlpha(totalSoldAlpha);
setTotalRemainingAlpha(totalPurchasedAlpha - totalSoldAlpha);

setTotalPurchasedDelta(totalPurchasedDelta);
setTotalSoldDelta(totalSoldDelta);
setTotalRemainingDelta(totalPurchasedDelta - totalSoldDelta);

        setTotalPurchased(totalPurchased);
        setTotalSold(totalSoldAlpha + totalSoldDelta + totalSoldHQ);
        setTotalSalesAlpha(totalSalesAlpha);
        setTotalSalesDelta(totalSalesDelta);
        setTotalSoldHQ(totalSoldHQ);
        setTotalSalesHQ(totalSalesHQ);
        setTotalRemainingAlpha(totalPurchasedAlpha - totalSoldAlpha);
        setTotalRemainingDelta(totalPurchasedDelta - totalSoldDelta);
        setTotalRemainingHQ(totalRemainingHQ);
        setTotalRemainingAllBranches(totalRemainingAllBranches);
      setTotalSoldAllBranches(totalSoldAllBranches);
      setTotalSalesAllBranches(totalSalesAllBranches);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (showData) {
      fetchData();
    }
 }, [showData, selectedProduct]);

 const handleApply = () => {
    setShowData(true);
 };

 return (
    <div className="stock-report-container">
      <img src={logo} className='logo' alt="Logo"/>
      <h3>Combined Report </h3>

      {/* Dropdown for selecting product */}
      <div className="product-select">
      <label 
  htmlFor="product"
  style={{
    fontSize: '20px',     // Adjust font size as needed
    color: '#000000',         // Adjust text color as needed
    marginRight: '10px',   // Adjust margin-right for spacing if needed
  }}
>
  Select Product:
</label>

<select 
  id="product" 
  value={selectedProduct} 
  onChange={(e) => setSelectedProduct(e.target.value)}
  style={{
    padding: '8px 12px',   // Adjust padding as needed
    fontSize: '16px',      // Adjust font size as needed
    borderRadius: '5px',   // Adjust border radius as needed
    border: '1px solid #ccc', // Adjust border properties as needed
    backgroundColor: '#fff',  // Adjust background color as needed
    color: '#333',         // Adjust text color as needed
  }}
>
  <option value="All">All Products</option>
  <option value="Coca cola">Coca cola</option>
  <option value="Fanta">Fanta</option>
  <option value="Sprite">Sprite</option>
  <option value="Pepsi">Pepsi</option>
  <option value="Mountain Dew">Mountain Dew</option>
</select>

        <button 
  onClick={handleApply}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '120px'
  }}
>
 Search
</button>

      </div>

      {showData && (
        <div className="stock-table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total stock purchased</td>
                <td>{totalPurchased}</td>
              </tr>
              <tr>
                <td>Total Purchased Stock in Alpha</td>
                <td>{totalPurchasedAlpha}</td>
              </tr>
              <tr>
                <td>Total Sold Stock in Alpha</td>
                <td>{totalSoldAlpha}</td>
              </tr>
              <tr>
                <td>Total Remaining Stock in Alpha</td>
                <td>{totalRemainingAlpha}</td>
              </tr>
              <tr>
                <td>Total Sales in Alpha</td>
                <td>{totalSalesAlpha}</td>
              </tr>
              <tr>
                <td>Total Purchased Stock in Delta</td>
                <td>{totalPurchasedDelta}</td>
              </tr>
              <tr>
                <td>Total Sold Stock in Delta</td>
                <td>{totalSoldDelta}</td>
              </tr>
              <tr>
                <td>Total Remaining Stock in Delta</td>
                <td>{totalRemainingDelta}</td>
              </tr>
              <tr>
                <td>Total Sales in Delta</td>
                <td>{totalSalesDelta}</td>
              </tr>
              <tr>
                <td>Total Sold Stock in HQ</td>
                <td>{totalSoldHQ}</td>
              </tr>
              <tr>
                <td>Total Remaining Stock in HQ</td>
                <td>{totalRemainingHQ}</td>
              </tr>
              <tr>
                <td>Total Sales in HQ</td>
                <td>{totalSalesHQ}</td>
              </tr>
              <tr>
                <td>Total Remaining Stock in all the branches plus HQ</td>
                <td>{totalRemainingAllBranches}</td>
              </tr>
              <tr>
                <td>Total Sold Stock in all the branches plus HQ</td>
                <td>{totalSoldAllBranches}</td>
              </tr>
              <tr>
                <td>Total Sales in all the branches plus HQ</td>
                <td>{totalSalesAllBranches}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
 );
};

export default StockReporthq;
