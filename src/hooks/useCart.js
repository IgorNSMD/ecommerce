import { useState,useEffect } from "react"
import { db } from "../admin/data/db" //"./admin/data/db"

export default function useCart() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart') 
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    const addToCart = (item) => {

        const itemExists = cart.findIndex(product => product.id === item.id )

        if(itemExists >=0){ // element exists in cart...
            //console.log(' Ya existe en carrito...')    

            if(cart[itemExists].qty >= MAX_ITEMS ) return

            const updateCart  = [...cart]
            updateCart[itemExists].qty++
            setCart(updateCart)

        } else {
            item.qty= 1
            setCart([...cart, item])
        }

       
    } 

    const removeFromCart = (id) => {
        //console.log('Eliminando,....', id)
        setCart(cart => cart.filter(item => item.id !== id))
    }

    const increaseQty = (id) => {

        //console.log('incrementando cantidad,....', id)

        const updatedCart = cart.map( item => {
            if (item.id === id  && item.qty < MAX_ITEMS){
                return {
                    ...item, 
                    qty: item.qty + 1
                }
            }

            return item
        })

        setCart(updatedCart)
    }

    const decreaseQty = (id) => {

        //console.log('incrementando cantidad,....', id)

        const updatedCart = cart.map( item => {
            if (item.id === id && item.qty > MIN_ITEMS ){
                return {
                    ...item, 
                    qty: item.qty - 1
                }
            }

            return item
        })

        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  }

  
}
