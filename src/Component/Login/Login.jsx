import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Login() {
    const [laoding, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    async function LoginSubmit(values) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .catch((err) => {
                setApiError(err.response.data.message);
                setLoading(false);
            })
        if (data.message === 'success') {
            setLoading(false);

        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invaled Email'),
        password: Yup.string().required("Password is required").matches(/^[A-Z][\w @]{5,8}$/, 'Invaled Password ex(Ahmed@123)'),
       })
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema
        , onSubmit: LoginSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>
                Login
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}

                <label htmlFor="email">Email :</label>
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password :</label>
                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

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
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>
                }
                <Link className="ps-3" to={'/register'}>Register</Link>
            </form>
        </div>
    </>
}

