"use client"
import { SessionProvider } from 'next-auth/react'
import React, { createContext } from 'react'
import { useState,useEffect } from 'react'
import toast from 'react-hot-toast'


export const CartContext = createContext({})

export function CartProductPrice(cartproduct) {
  let price = cartproduct.price;
  if (cartproduct.size) {
    price += cartproduct.size.price;
  }
  if (cartproduct.extras.length>0) {
    for (const extra of cartproduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

const SessionWrapper = ({children}) => {
  const [cartProduct, setCartProduct] = useState([])
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
 

  useEffect(() => {
   if (ls && ls.getItem('cart')) {
      setCartProduct(JSON.parse(ls.getItem('cart')))
   }
  }, [])
  
  function ClearCart() {
    setCartProduct([])
    SaveCartProductToLocalstorage([])
  }

  function RemoveCartProduct(indexToRemove) {
     setCartProduct(prevProducts=>{
      const newCartProduct = prevProducts.filter((v,index)=>index!==indexToRemove)
      SaveCartProductToLocalstorage(newCartProduct)
      return newCartProduct;
     });
     toast.success('Removed from cart')
  }

  function SaveCartProductToLocalstorage(CartProduct) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(CartProduct))
    }
  }


  function addToCart(product,size=null,extras=[]) {
      setCartProduct(prevProducts=>{
      const cartproduct = {...product, size, extras}
      const newProducts = [...prevProducts, cartproduct]
      SaveCartProductToLocalstorage(newProducts)
      return newProducts
    })
    
  }
  return (
    <SessionProvider>
      <CartContext.Provider value={{cartProduct,setCartProduct,addToCart,RemoveCartProduct,ClearCart}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}

export default SessionWrapper
