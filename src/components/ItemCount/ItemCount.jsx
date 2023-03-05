import { useState } from "react"
import {toast} from 'react-toastify'
export const ItemCount = ({valInicial, stock, onAdd}) => {
    
    const [contador, setContador] = useState(valInicial)
            //Var       //Modificar var     //Estado inicial

    const sumar = () =>  (contador < stock) && setContador(contador + 1) //contador = contador + 1
    const restar = () => (contador > valInicial)  && setContador(contador - 1)  //Operador ternario sin else
    const agregarCarrito = () => {
      onAdd(contador)
      toast(`🦄 Agregaste ${contador} productos al carrito!`) 
    }

  return (
    <>
        <button className="btn btn-success mx-1 mb-2" onClick={() => restar()}>-</button>
          {contador}
        <button className="btn btn-success mx-1 mb-2" onClick={() => sumar()}>+</button>
        <button className="btn btn-success mx-1 mb-2" onClick={() => agregarCarrito()}>Agregar al carrito</button>
        <a className="nav-link" href={'/'}><button className="btn btn-secondary">Continuar Comprando</button></a> 
    </>
  )
}