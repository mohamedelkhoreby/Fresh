import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Register() {
    const [laoding, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();
    async function registerSubmit(values) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .catch((err) => {
                setApiError(err.response.data.errors.msg);
                setLoading(false);
            })
        if (data.message === 'success') {
            setLoading(false);
            navigate('/login');
        }
    }
    let validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(3, 'Min length is 3').max(30, 'Max Length is 30'),
        email: Yup.string().required('Email is required').email('Invaled Email'),
        password: Yup.string().required("Password is required").matches(/^[A-Z][\w @]{5,8}$/, 'Invaled Password ex(Ahmed@123)'),
        rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref('password')], "Password and Repassword not matches"),
        phone: Yup.string().required("phone number is required").matches(/^01[0125][0-9]{8}$/, "We need Egyption number")
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema
        , onSubmit: registerSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>
                Register Now
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}

                <label htmlFor="name">Name :</label>
                <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' name='name' className='form-control mb-3' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

                <label htmlFor="email">Email :</label>
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password :</label>
                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

                <label htmlFor="rePassword">rePassword :</label>
                <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2'>{formik.errors.rePassword} </div> : null}

                <label htmlFor="phone">Phone :</label>
                <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="pel" id='phone' name='phone' className='form-control mb-3' />
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

                {laoding ? <button type='button' className='btn bg-main text-light'>
                    <BallTriangle
                        height={25}
                        width={25}
                        radius={5}
                        color="#fff"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>
                }                <Link className="ps-3" to={'/login'}>Login</Link>

            </form>
        </div>
    </>
}
