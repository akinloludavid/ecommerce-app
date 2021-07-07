import React, {useState,useEffect} from 'react';
import './App.css';

import {Products, Navbar} from './components'
import {commerce} from './lib/commerce'
function App() {

  const [products, setProducts]= useState([])
  const [cart,setCart] = useState({})
  const fetchProducts = async ()=>{
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async ()=>{
    const c = await commerce.cart.retrieve()
    setCart(c)
  }

  const handleAddToCart = async (productId, quantity)=>{
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  useEffect(()=>{
    fetchProducts()
    fetchCart()
  },[])
  console.log(cart)

  return (
    <div className="App">
      <h3>Ecommerce</h3>
      <Navbar totalItems = {cart.total_items}/>
      <Products products = {products} onAddToCart ={handleAddToCart}/>

    </div>
  );
}

export default App;
