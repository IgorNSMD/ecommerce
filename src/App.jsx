import { useState,useEffect } from "react"

import Header from "./admin/components/Header"
import Product from "./admin/components/Product"
import { db } from "./admin/data/db"

function App() {

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



  return (
    <>

        <Header 
            cart = { cart }
            removeFromCart = { removeFromCart }
            increaseQty = { increaseQty }
            decreaseQty = { decreaseQty }
            clearCart = { clearCart }
        />



        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((product) => (
                    <Product
                        key = { product.id  } 
                        product={ product }
                        cart = { cart }
                        setCart ={ setCart }
                        addToCart = { addToCart }
                    />
                ))}
                
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">Guitar ISM - Todos los derechos Reservados</p>
            </div>
        </footer>

    </>
  )
}

export default App
