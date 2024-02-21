import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext';
export default function Cart() {
    let { getCartItem, deleteCartItem, udpdateItemQuantity } = useContext(CartContext);
    const [cartItem, setCartItem] = useState({});
    const [laoding, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    async function getProduct() {
        let { data, err } = await getCartItem();
        if (data != null) {
            setCartItem(data ?? null);
            setLoading(false)
        } if (err != null) {
            setApiError(err.massage ?? null);
            setLoading(false)
        }
    }
    async function deleteItem(_id) {
        setLoading(true)
        let { data, err } = await deleteCartItem(_id);
        console.log(data);
        if (data != null) {
            setCartItem(data ?? null);
            setLoading(false)
        } if (err != null) {
            setApiError(err.massage ?? null);
            setLoading(false)
        }
    }
    async function updataCount(_id, count) {
        let { data } = await udpdateItemQuantity(_id, count);
        if (data != null) {
            setCartItem(data ?? null);
        }
    }
    useEffect(() => {
        getProduct();
    }, []
    );
    return <>
        {
            apiError ? <div className='alert alert-danger py-2'>{apiError}</div>
                : <>
                    {laoding ? <div className="text-center d-flex justify-content-center align-items-center vh-100">
                        <Loading /> </div>
                        : <div className='bg-main-light' >
                            <div className="col gy-1">
                                <h2>Shop Cart</h2>
                                <p className='text-main'> Total Price : {cartItem.data.totalCartPrice}</p>
                                {cartItem.data.products.map(product =>
                                    <div key={product.id} className="row p-2 m-0 border-1 border-bottom ">
                                        <div className="col-md-1">
                                            <Link to={`/productDetails/${product.product._id}`} style={{ textDecoration: 'none' }}>
                                                <div className="img">
                                                    <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-10">
                                            <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0, 3).join(' ')}</h3>
                                            <p className='text-main fw-bold'>Price :{product.price}EGP</p>
                                            <button onClick={(() => deleteItem(product.product._id))} className='btn p-0'> <i className='fas fa-trash-can text-main'></i> Remove</button>
                                        </div>
                                        <div className="col-md-1">
                                            <div className="count">
                                                <button onClick={(() => updataCount(product.product._id, product.count + 1))} className='btn brdr p-1'>+</button>
                                                <span className='mx-2'>{product.count}</span>
                                                <button onClick={(() => updataCount(product.product._id, product.count !== 1 ? product.count - 1 : null))} className='btn brdr p-1'>-</button>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>}
                </>
        }</>
}
