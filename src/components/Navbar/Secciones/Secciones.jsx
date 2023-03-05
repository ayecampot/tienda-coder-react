import { Link } from "react-router-dom";
import React from "react";
import collar from '../../../images/collar.png';
const Secciones = React.memo(() => {
    return (
        <>
             <li className="nav-item">
                  <Link className="a-size nav-link"to={"/"}><img className="w-logo" src={collar} alt="collar de perrito size" /></Link>
           
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/contacto"}><button className="btn btn-primary">Contacto</button></Link>
            </li>
        </>
    );
})

export default Secciones;
