import { useCarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"
import  React  from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { useState } from "react"
import { createOrdenCompra, getOrdenCompra, getProducto, updateProducto } from "../../firebase/firebase"

export const Checkout = () => {
    const {carrito, emptyCart, totalPrice} = useCarritoContext()
    const datosFormulario = React.useRef()
    const [ Email, setEmail ] = useState("")                       
    const [ repEmail, setRepEmail ] = useState("") 
    const [ errorEmail, setErrorEmail ] = useState(true) 
    let navigate = useNavigate()

    const consultarFormulario = (e) => {
        e.preventDefault()
        const datForm = new FormData(datosFormulario.current)
        const cliente = Object.fromEntries(datForm)
        
        const aux = [...carrito]

        aux.forEach(prodCarrito => {
            getProducto(prodCarrito.id).then(prodBDD => {
                prodBDD.stock -= prodCarrito.cant //Descuento del stock la cantidad comprada
                updateProducto(prodCarrito.id, prodBDD)
            })
        })

        createOrdenCompra(cliente, aux, totalPrice(), new Date().toISOString()).then(ordenCompra =>{
            toast.success(`¡Muchas gracias por comprar con nosotros!, su orden de compra con el ID: ${ordenCompra.id
            } por un total de $ ${new Intl.NumberFormat('de-DE').format(totalPrice())} fue realizada con exito`)
            emptyCart()
            e.target.reset()
            navigate("/")
        })

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
                <input type="text" placeholder="Ayelen Campot" className="form-control" name="nombre" pattern="^[a-zA-Z]+" minlength="3" maxlength="20" required autocomplete="off"/>
            </div>
            <div className="mb-3 col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" placeholder="ayecampot@gmail.com" className="form-control" name="email" required pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" autocomplete="off" onChange={(e)=> {                    
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
                                    <input type="email" placeholder="ayecampot@gmail.com" className="form-control" name="repEmail" autocomplete="off" required pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" onChange={(e)=>{  
                                        setRepEmail(e.target.value)   
                                        if (e.target.value === Email){
                                            setErrorEmail(true)
                                        }    
                                        else{
                                            setErrorEmail(false)
                                        }               
                                    }}/>
                                    <p style={{display: errorEmail === false? 'block' : 'none'}} className="errorEmails">*Los emails ingresados deben ser iguales</p>
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