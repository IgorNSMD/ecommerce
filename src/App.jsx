
import Header from "./admin/components/Header"
import Product from "./admin/components/Product"


import useCart from "./hooks/useCart"

function App() {

    const {data,cart,addToCart,removeFromCart,increaseQty,decreaseQty,clearCart } = useCart()



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
