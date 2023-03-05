// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0nhyFKpsud_5YHl_U0EP2CHlzVcqnXNw",
  authDomain: "petshop-coder.firebaseapp.com",
  projectId: "petshop-coder",
  storageBucket: "petshop-coder.appspot.com",
  messagingSenderId: "175674764752",
  appId: "1:175674764752:web:bdd021e47627effe22ddd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore() //Consultar la BDD
/*
    CRUD PRODUCTOS

    CREATE
    READ
    UPDATE
    DELETE
*/

export const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach( async (prod) => {
        await addDoc(collection(db,"productos"), {
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            marca: prod.marca,
            precio: prod.precio,
            stock: prod.stock,
            img: prod.img,
            categoria: prod.nombreCategoria
        })
    })
}

export const getProductos = async() => {
    const productos = await getDocs(collection(db,"productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id}
    })
    return items
}

export const getProducto = async(id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id: producto.id}
    return item
}

export const updateProducto = async(id, info) => {
    await updateDoc(doc(db, "productos", id), info)
}

export const deleteProducto = async(id) => {
    await deleteDoc(doc(db, "productos", id))
}

//Create orden Compra

export const createOrdenCompra = async(cliente, productos,precioTotal, fecha) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"), {
        datosCliente: cliente,
        productos: productos,
        precioTotal: precioTotal, 
        fecha: fecha
    })
    return ordenCompra
}

export const getOrdenCompra = async(id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const oCompra = {...ordenCompra.data(), id: ordenCompra.id}
    return oCompra
}