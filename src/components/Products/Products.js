import React from 'react';
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

const Products = ({products, onAddToCart}) => {
  const classes = useStyles()
  return (
    <div className = {classes.content}>
      <div className = {classes.toolbar}/>
      <Grid container justify = "center" spacing={4}>
        {products ? products.map(product =>(
          <Grid key = {product.id} xs={12} sm={6} lg={3}>
            <Product product = {product} onAddToCart={onAddToCart}/>
          </Grid>
        )):<p>No products found</p>}
      </Grid>
    </div>

  )
    
}

export default Products;