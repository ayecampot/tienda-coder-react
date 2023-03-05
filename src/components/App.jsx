import './App.css'
import 'react-toastify/dist/ReactToastify.css'


//Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Toastify
import { ToastContainer } from 'react-toastify';
// import { cargarBDD } from '../firebase/firebase';

//Componentes
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { ItemListContainer } from './ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './ItemDetailContainer/ItemDetailContainer';
import { Contacto } from './Contacto/Contacto';
import { Cart } from './Cart/Cart';
import { Checkout } from './Checkout/Checkout';
//Context
import { DarkModeProvider } from '../context/DarkModeContext';
import { CarritoProvider } from '../context/CarritoContext';
const App = () => {
    // cargarBDD()
    return (
    <>

    <BrowserRouter>
      <CarritoProvider>
        <DarkModeProvider>
          <Navbar/>
            <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path='/' element={<ItemListContainer/>}/> 
              <Route path='/item/:id' element={<ItemDetailContainer/>}/>
              <Route path='/categorias/:categoria' element={<ItemListContainer/>}/>
              <Route path='/contacto' element={<Contacto/>}/> 
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
            </Routes> 
            <ToastContainer/>
        </DarkModeProvider>
      </CarritoProvider>
      
    </BrowserRouter>
      
    </>
  );
}

export default App;

