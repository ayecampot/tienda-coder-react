import { useCarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"
import  React  from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { useState } from "react"
import { createOrdenCompra, getProducto, updateProducto } from "../../firebase/firebase"

export const Checkout = () => {
    const { carrito, totalPrice, emptyCart } = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()
    const [ Email, setEmail ] = useState("")                       
    const [ repEmail, setRepEmail ] = useState("") 
    const [ errorEmail, setErrorEmail ] = useState(true)     
    const consultarFormulario = (e) => {
        e.preventDefault()
        

        if (errorEmail === true) {
            const datForm = new FormData(datosFormulario.current)
            const cliente = Object.fromEntries(datForm)
            const aux = [...carrito]

            aux.forEach(prodCarrito => {
                getProducto(prodCarrito.id).then(prodBDD => { // a través del id del producto en carrito estoy consultando el producto en la BDD
                    prodBDD.stock -= prodCarrito.cant // descuenta del stock de la cantidad comprada
                    updateProducto(prodCarrito.id, prodBDD)
                })
            })

            createOrdenCompra(cliente, aux, totalPrice(), new Date().toISOString()).then(ordenCompra => {
                toast.success(` ⭐ ¡Tu compra fue realizada con éxito! ⭐ Se generó el ticket de compra con ID: ${ordenCompra.id}`)
                emptyCart()
                e.target.reset()
                navigate("/")
            })
        }
    }


   return (
    <>
        {carrito.length === 0 
         ? 
          <>
                <h2>No posee productos en el carrito</h2>
                <Link className="nav-link" to={'/'}><button className="btn btn-dark">Continuar comprando</button></Link> 
          </>
          :
            <div className="container" style={{marginTop:"20px"}}>
            <form onSubmit={consultarFormulario} ref={datosFormulario}>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre y apellido</label>
                <input type="text" placeholder="Ayelen Campot" className="form-control" name="nombre" required autocomplete="off"/>
            </div>
            <div className="mb-3 col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" placeholder="marialopez@gmail.com" className="form-control" name="email" required pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" autocomplete="off" onChange={(e)=> {                    
                                        setEmail(e.target.value)
                                        if (e.target.value === repEmail){
                                            setErrorEmail(true)
                                        }
                                        else{
                                            setErrorEmail(false)
                                        }     
                                        }}/>
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="repEmail" className="form-label">Repetir Email</label>
                                    <input type="email" placeholder="Repetilo de nuevo por favor" className="form-control" name="repEmail" autocomplete="off" required pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" onChange={(e)=>{  
                                        setRepEmail(e.target.value)   
                                        if (e.target.value === Email){
                                            setErrorEmail(true)
                                        }    
                                        else{
                                            setErrorEmail(false)
                                        }               
                                    }}/>
                                    <p style={{display: errorEmail === false? 'block' : 'none'}} className="text-secondary">* Los emails ingresados deben ser iguales</p>
                                </div>
            <div className="mb-3">
                <label htmlFor="celular" className="form-label">Numero telefonico</label>
                <input type="tel" placeholder="1131508000" className="form-control" name="teléfono" pattern="^[0-9]+" minlength="8" maxlength="14" required autocomplete="off"/>
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input type="text" placeholder="Almafuerte 321" className="form-control" name="direccion" minlength="7" maxlength="30" required autocomplete="off"/>
            </div>

            <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>
        </div>
        }
    
    </>
          
   )
}