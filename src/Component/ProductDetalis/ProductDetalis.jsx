import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import Slider from "react-slick";
function ProductDetalis() {
    const [detalis, setDetalis] = useState({});
    const [laoding, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    let { id } = useParams()
    async function getProductDeralis(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).catch((err) => {
            setApiError(err.message);
            setLoading(false);
        }) || {}
        if (data != null) {
            setDetalis(data.data ?? null)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductDeralis(id);
    }, []
    );
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return <>
        {apiError ? <div className='alert alert-danger py-2'>{apiError}</div>
            : <>
                {laoding ? <div className="text-center d-flex justify-content-center align-items-center vh-100">
                    <InfinitySpin
                        visible={true}
                        width="400"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    /></div>
                    :
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <Slider {...settings}>
                                {detalis.images.map(image => <img key={detalis.id} src={image} className='w-100' alt={detalis.title} />)}
                            </Slider>
                        </div>
                        <div className="col-md-8">
                            <div className="details">
                                <h3 className='h5'>{detalis.title}</h3>
                                <p className='py-3'>{detalis.description}</p>
                                <span className="font-sm text-main">
                                    {detalis.category.name}
                                </span>
                                <div className="d-flex py-3 justify-content-between align-item-center">
                                    <span className='font-sm'>{detalis.price}Egp</span>
                                    <span className='font-sm'>
                                        <i className='fas fa-star rating-color me-1'></i>
                                        {detalis.ratingsAverage}
                                    </span>
                                </div>
                                <button className='btn bg-main text-main-light w-100 btn-sm'>Add Cart</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        }
    </>
}
export default ProductDetalis;
