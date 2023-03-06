import { useState } from "react"
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'



export const ItemCount = ({valInicial, stock, onAdd}) => {

    const [contador, setContador] = useState(valInicial)
         
  
    const sumar = () =>  (contador < stock) && setContador(contador + 1) 
    const restar = () => (contador > valInicial)  && setContador(contador - 1) 
    const agregarCarrito = () => {
      onAdd(contador)
      toast(`🦄 Agregaste ${contador} productos al carrito!`) 
    }

  return (
    <>
 
        <button className="btn btn-secondary mx-1 mb-2" onClick={() => restar()}>-</button>
          {contador}
        <button className="btn btn-secondary mx-1 mb-2" onClick={() => sumar()}>+</button>
        <button className="btn btn-secondary mx-1 mb-2" onClick={() => agregarCarrito()}>Agregar al carrito</button>
        <Link className="nav-link" to={'/'}><button className="btn btn-success">Seguir comprando</button></Link> 

        
    </>
  )
}