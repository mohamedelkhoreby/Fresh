import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
            headers
        }).then((res) => res).catch((err) => err)
    }
    function deleteCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        }).then((res) => res).catch((err) => err)
    }
    function udpdateItemQuantity(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count
            },
            {
                headers
            }).then((res) => res).catch((err) => err)
    }

    function getCartItem() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => res).catch((err) => err)
    }

    return <CartContext.Provider value={{ addToCart, getCartItem, udpdateItemQuantity, deleteCartItem }}>
        {props.children}
    </CartContext.Provider>
}
