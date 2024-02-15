import React, {useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    const [laoding, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();

    async function ForgetPasswordSubmit(values) {
        setLoading(true);
        let data  = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            .catch((err) => {
                setApiError(err.message);
                setLoading(false);
            })
        if (data.data.statusMsg === 'success') {
            setLoading(false);
            navigate('/verfiypassword')
        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invaled Email'),
    })
    let formik = useFormik({
        initialValues: {
            email: '',
        }, validationSchema
        , onSubmit: ForgetPasswordSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>
            reset your account password
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}

                <label htmlFor="email">Email :</label>
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}
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
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Verify</button>
                }
            </form>
        </div>
        </>
}
