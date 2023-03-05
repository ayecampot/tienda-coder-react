import { Link } from "react-router-dom";
import { useCarritoContext } from "../../context/CarritoContext";
const CartWidget = () => {
    const {getItemQuantity} = useCarritoContext()
    return (
        <>
            <Link className="nav-link" to={'/cart'}>
            <i className="bi bi-cart-fill mx-1 font-color px-2"></i> 
                {getItemQuantity() > 0 && <span className="cantCarrito mx-2 mb-2">{getItemQuantity()}</span>}
            </Link> 
        </>
    );
}

export default CartWidget;
