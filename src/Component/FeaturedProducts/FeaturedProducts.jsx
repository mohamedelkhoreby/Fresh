import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../Context/CartContext';

function FeaturedProducts() {
    const [products, setProducts] = useState({});
    const [laoding, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    // function to send the product id to cart context to add product to cart.
    let { addToCart } = useContext(CartContext);
    async function addProduct(id) {
         await addToCart(id);
    }
    //function call api to get the data
    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .catch((err) => {
                setApiError(err.message);
                setLoading(false);
            }) || {}
        if (data != null) {
            setProducts(data.data ?? null)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProduct();
    }, []
    );
    return <>
        {apiError ? <div className='alert alert-danger py-2'>{apiError}</div>
            : <> {laoding ? <div className="text-center d-flex justify-content-center align-items-center vh-100">
                <Loading />
            </div>
                : <div className="row gy-4">
                    {products.map(product =>
                        <div key={product.id} className="col-lg-2 ">
                            <div className="product p-2">
                                <Link to={`/productDetails/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <img src={product.imageCover} className='w-100' alt={product.title} />
                                    <span className='font-sm text-main'>{product.category.name}</span>
                                    <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                    <div className="d-flex py-3 justify-content-between align-item-center">
                                        <span className='font-sm'>{product.price}EGP</span>
                                        <span className='font-sm'>
                                            <i className='fas fa-star rating-color me-1'></i>
                                            {product.ratingsAverage}</span>
                                    </div>
                                </Link>
                                <button onClick={() => addProduct(product.id)} className='btn bg-main text-main-light w-100 btn-sm'>Add Cart</button>
                            </div>
                        </div>)
                    }
                </div>}
            </>}
    </>
}
export default FeaturedProducts;