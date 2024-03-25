import React, { useState, useEffect } from 'react';
import logo from './Logo.jpg'; // Import your logo file
import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import firestore from './firebase'; // Import firestore from firebase.js

function PurchasePage() {
  const [orderNo, setOrderNo] = useState('001');
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    // Load order number from local storage
    const savedOrderNo = localStorage.getItem('orderNo');
    if (savedOrderNo) {
      setOrderNo(savedOrderNo);
    }
  }, []);

  // Function to handle company selection from dropdown
  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    setCompanyName(selectedCompany);
    // Logic to generate company code based on selected company
    switch (selectedCompany) {
      case 'Coca Cola':
        setCompanyCode('CC');
        break;
      case 'PepsiCo':
        setCompanyCode('PP');
        break;
      case 'Red Bull':
        setCompanyCode('RB');
        break;
      case 'Monster Beverage Corporation':
        setCompanyCode('MBC');
        break;
      case 'National Beverage Corp. (FIZZ)':
        setCompanyCode('NBFC');
        break;
      case 'Cott Corporation':
        setCompanyCode('CCorp');
        break;
      case 'Jones Soda Co.':
        setCompanyCode('JSC');
        break;
      // Add more cases for other companies if needed
      default:
        setCompanyCode('');
    }
  };

  // Function to handle product selection from dropdown
  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProductName(selectedProduct);
    // Logic to generate product code and set price based on selected product
    switch (selectedProduct) {
      case 'Coca cola':
        setProductCode('CC001');
        setPrice('50');
        break;
      case 'Fanta':
        setProductCode('FT001');
        setPrice('60');
        break;
      case 'Sprite':
        setProductCode('SP001');
        setPrice('70');
        break;
      case 'Pepsi':
        setProductCode('PS001');
        setPrice('80');
        break;
      case 'Mountain Dew':
        setProductCode('MD001');
        setPrice('90');
        break;
      default:
        setProductCode('');
        setPrice('');
    }
  };

  // Function to handle price change
  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    setPrice(priceValue);
    calculateTotal(priceValue, quantity);
  };

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    const quantityValue = e.target.value;
    setQuantity(quantityValue);
    calculateTotal(price, quantityValue);
  };

  // Function to calculate total
  const calculateTotal = (price, quantity) => {
    const totalPrice = parseFloat(price) * parseFloat(quantity);
    setTotal(totalPrice.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data for Firestore
    const purchaseData = {
      orderNo,
      companyName,
      companyCode,
      productName,
      productCode,
      price,
      quantity,
      total,
    };
  
    try {
      // Add purchase data to Firestore collection
      const purchasedDocRef = await addDoc(collection(firestore, "hq_products_purchased"), purchaseData);
      console.log("Purchase data added with ID: ", purchasedDocRef.id);
  
      // Update or insert data into hq_products_remaining collection
      const remainingDocRef = doc(firestore, 'hq_products_remaining', productCode);
      const docSnapshot = await getDoc(remainingDocRef);
      if (docSnapshot.exists()) {
        // Document already exists, update the quantity
        const existingQuantity = docSnapshot.data().quantity;
        const newQuantity = existingQuantity + parseInt(quantity);
        await updateDoc(remainingDocRef, {
          quantity: newQuantity
        });
      } else {
        // Document doesn't exist, create a new one
        await setDoc(remainingDocRef, {
          quantity: parseInt(quantity),
          productCode: productCode
        });
      }
  
      // Increment order number and save it to local storage
      const newOrderNo = String(Number(orderNo) + 1).padStart(3, '0');
      setOrderNo(newOrderNo);
      localStorage.setItem('orderNo', newOrderNo);

      // Clear fields after successful submission
      setCompanyName('');
      setCompanyCode('');
      setProductName('');
      setProductCode('');
      setPrice('');
      setQuantity('');
      setTotal('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.heading}>Purchase Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldContainer}>
          <label htmlFor="orderNo" style={styles.label}>Order No:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="orderNo"
              value={orderNo}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="companyName" style={styles.label}>Company Name:</label>
          <div style={styles.inputContainer}>
            <select
              id="companyName"
              value={companyName}
              onChange={handleCompanyChange}
              style={styles.input}
            >
              <option value="">Select Company</option>
              <option value="Coca Cola">Coca Cola</option>
              <option value="PepsiCo">PepsiCo</option>
              <option value="Red Bull">Red Bull</option>
              <option value="Monster Beverage Corporation">Monster Beverage Corporation</option>
              <option value="National Beverage Corp. (FIZZ)">National Beverage Corp. (FIZZ)</option>
              <option value="Cott Corporation">Cott Corporation</option>
              <option value="Jones Soda Co.">Jones Soda Co.</option>
            </select>
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="companyCode" style={styles.label}>Company Code:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="companyCode"
              value={companyCode}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="productName" style={styles.label}>Product Name:</label>
          <div style={styles.inputContainer}>
            <select
              id="productName"
              value={productName}
              onChange={handleProductChange}
              style={styles.input}
            >
              <option value="">Select Product</option>
              <option value="Coca cola">Coca cola</option>
              <option value="Fanta">Fanta</option>
              <option value="Sprite">Sprite</option>
              <option value="Pepsi">Pepsi</option>
              <option value="Mountain Dew">Mountain Dew</option>
            </select>
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="productCode" style={styles.label}>Product Code:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="productCode"
              value={productCode}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="price" style={styles.label}>Price:</label>
          <div style={styles.inputContainer}>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="quantity" style={styles.label}>Quantity:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="total" style={styles.label}>Total:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="total"
              value={total}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
        <button type="submit" style={styles.button}>Purchase</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '115vh',
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    minWidth: '120px',
    marginRight: '10px',
  },
  inputContainer: {
    flex: '1',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PurchasePage;



