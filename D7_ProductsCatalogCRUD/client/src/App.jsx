import { useState } from 'react';
import ProductInput from './components/ProductInput';
import ProductCatalog from './components/ProductCatalog';
import './App.css'

function App() {
  const [productAdded, setProductAdded] = useState(false);

  const handleProductAdded = () => {
    setProductAdded(prev => !prev); // Toggle state to force re-render
  };

  return (
    <>
      <ProductInput onProductAdded={handleProductAdded}></ProductInput>
      <hr></hr>
      <ProductCatalog productAdded={productAdded}></ProductCatalog>
    </>
  )
}

export default App
