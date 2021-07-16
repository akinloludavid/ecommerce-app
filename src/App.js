import React, {useState,useEffect} from 'react';
import './App.css';

import {Products, Navbar,Cart, Checkout} from './components'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  const [products, setProducts]= useState([])
  const [cart,setCart] = useState({})
  
  const fetchProducts = async ()=>{
    try{
      const {data} = await commerce.products.list()
      setProducts(data)
    }
    catch(error){
      console.log(error.message)
    }
  }

  const fetchCart = async ()=>{
    try{
      const c = await commerce.cart.retrieve()
      setCart(c)
      
    }catch(error){
      console.log(error.message)
    }
  }

  const handleAddToCart = async (productId, quantity)=>{
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity)=>{
    const {cart} = await commerce.cart.update(productId, {quantity})
    setCart(cart)
  }

  const handleRemoveFromCart = async  (productId)=>{
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart)
  }
  const handleEmptyCart = async ()=>{
    const {cart} = await commerce.cart.empty()
;
    setCart(cart)
  }

  useEffect(()=>{
    fetchProducts()
    fetchCart()
  },[])


  return (
    <Router>

      <div className="App">
        
        <Navbar totalItems = {cart.total_items}/>
        <Switch>
          <Route exact path ="/">
            <Products products = {products} onAddToCart ={handleAddToCart}/>
          </Route>
          <Route path = "/cart">
             <Cart cart = {cart}

               handleUpdateCartQty={handleUpdateCartQty}
               handleRemoveFromCart={handleRemoveFromCart}
               handleEmptyCart={handleEmptyCart}
             />

          </Route>
          <Route exact path = "/checkout">
            <Checkout cart = {cart}/>
          </Route>

       
        </Switch>
      </div>
    </Router>

  );
}

export default App;
