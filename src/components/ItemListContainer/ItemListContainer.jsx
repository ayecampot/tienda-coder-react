import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
//Componentes
import { ItemList } from '../ItemList/ItemList'

//Context
import { useDarkModeContext } from '../../context/DarkModeContext'

//Firebase
import { getProductos } from '../../firebase/firebase'

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([])
    const {categoria}= useParams()
    const {darkMode} = useDarkModeContext()
    console.log(darkMode)
    useEffect(() => {
        if(categoria) {
            getProductos()
            .then(items => {
                const products = items.filter(prod => prod.stock > 0).filter(prod => prod.categoria === (categoria))
                const productsList = <ItemList products={products} plantilla={'item'}/> //Array de productos en JSX
                setProductos(productsList)
            })
        } else {
            getProductos()
            .then(items => {
                const products = items.filter(prod => prod.stock > 0)
                const productsList = <ItemList products={products} plantilla={'item'}/> 
                setProductos(productsList)
            })
        }
        
    }, [categoria])
   
    return (
        <div className='row  contenedorProductos mb-4 mt-4'>
            {productos}
        </div>
    )
}