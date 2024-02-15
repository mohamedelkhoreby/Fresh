import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
export default function ResetPassword() {
    const [laoding, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();
    let { setUserToken } = useContext(UserContext);
    async function ResetPasswordSubmit(values) {
        setLoading(true);
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            .catch((err) => {
                setApiError(err.response.data.message);
                setLoading(false);
            })
        if (data.token) {
            setLoading(false);
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            navigate('/');
        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invaled Email'),
        newPassword: Yup.string().required("Password is required").matches(/^[A-Z][\w @]{5,8}$/, 'Invaled Password ex(Ahmed@123)'),
    })
    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        }, validationSchema
        , onSubmit: ResetPasswordSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>
                Reset your Password
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}

                <label htmlFor="email">Email :</label>
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

                <label htmlFor="newPassword">newPassword :</label>
                <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='newPassword' name='newPassword' className='form-control mb-3' />
                {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger py-2'>{formik.errors.newPassword}</div> : null}

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
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Reset</button>
                }
            </form>
        </div>
    </>
}


