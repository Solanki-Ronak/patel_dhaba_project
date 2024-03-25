import React, { useState } from 'react';
import logo from './Logo.jpg';
import { collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import firestore from './firebase';

function SellPage() {
  const [CustomerId, setCustomerId] = useState('');
  const [SellDate, setSellDate] = useState(getTodayDate());
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const [feedback, setFeedback] = useState('');

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const calculateTotal = () => {
    const totalPrice = parseFloat(quantity) * parseFloat(price);
    setTotal(totalPrice.toFixed(2));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    calculateTotal();
  };

  const handleProductChange = async (e) => {
    const selectedProduct = e.target.value;
    setProductName(selectedProduct);

    // Logic to set product code and price based on product name
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
        break;
    }
    calculateTotal();
  };

  const handleSell = async (e) => {
    e.preventDefault();
  
    try {
      const productQuery = query(collection(firestore, 'alpha_products_remaining_new'), where('productCode', '==', productCode));
      const productSnapshot = await getDocs(productQuery);
  
      if (productSnapshot.empty) {
        // Product not found in the collection
        alert('Product not available for sale.');
        return;
      }
  
      productSnapshot.forEach(async (doc) => {
        const productData = doc.data();
        if (productData.quantity >= quantity) {
          const updatedQuantity = productData.quantity - quantity;
          await updateDoc(doc.ref, { quantity: updatedQuantity }); // Update the stock
          await addSaleToHQ(); // Add sale to sales_hq
          alert('Successfully sold');
        } else {
          alert('Not enough stock');
        }
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      setFeedback('An error occurred. Please try again.'); // Inform user
    } finally {
      clearFields(); // Clear fields regardless of success/failure
    }
  };
  

  const addSaleToHQ = async () => {
    const saleData = {
      customerId: CustomerId,
      sellDate: SellDate,
      productName: productName,
      productCode: productCode,
      price: price,
      quantity: quantity,
      total: total
    };
    try {
      await addDoc(collection(firestore, 'sales_alpha'), saleData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const clearFields = () => {
    setCustomerId('');
    setSellDate(getTodayDate());
    setProductName('');
    setProductCode('');
    setPrice('');
    setQuantity('');
    setTotal('');
    setFeedback('');
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.heading}>Sell Page</h1>
      <form onSubmit={handleSell} style={styles.form}>
        <div style={styles.fieldContainer}>
          <label htmlFor="CustomerID" style={styles.label}>Customer ID:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="CustomerID"
              value={CustomerId}
              onChange={(e) => setCustomerId(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="SellDate" style={styles.label}>Sell Date:</label>
          <div style={styles.inputContainer}>
            <input
              type="date"
              id="SellDate"
              value={SellDate}
              onChange={(e) => setSellDate(e.target.value)}
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
          <label htmlFor="price" style={styles.label}>Price  :</label>
          <div style={styles.inputContainer}>
            <input
              type="number"
              id="price"
              value={price}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="quantity" style={styles.label}>Quantity :</label>
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
          <label htmlFor="Total" style={styles.label}>Total:</label>
          <div style={styles.inputContainer}>
            <input
              type="number"
              id="Total"
              readOnly
              value={total}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <div style={styles.inputContainer}>
            <span>{feedback}</span>
          </div>
        </div>
        <button type="submit" style={styles.button}>Sell</button>
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
    height: '700px',
    marginTop:'5px',
    fontSize:'16px',
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

export default SellPage;
