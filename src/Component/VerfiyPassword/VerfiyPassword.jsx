import React, { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BallTriangleLoading from '../Loading/BallTriangle';
export default function VerfiyPassword() {
    const [laoding, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();

    async function VerfiyPasswordSubmit(values) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .catch((err) => {
                setApiError(err.response.data.message);
                setLoading(false);
            })
        if (data.status === 'Success') {
            setLoading(false);
            navigate('/resetPassword');
        }
    }
    let validationSchema = Yup.object({
        resetCode: Yup.string().required('resetCode is required').matches(/^[0-9 ]{6}$/, 'Rest Code Not Right'),
    })
    let formik = useFormik({
        initialValues: {
            resetCode: '',
        }, validationSchema
        , onSubmit: VerfiyPasswordSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>
                Please Enter Your Verification Code
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}

                <label htmlFor="resetCode">ResetCode :</label>
                <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='resetCode' name='resetCode' className='form-control mb-3' />
                {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger py-2'>{formik.errors.resetCode}</div> : null}

                {laoding ? <button type='button' className='btn bg-main text-light'>
                    <BallTriangleLoading/>
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Verify</button>
                }
            </form>
        </div>
    </>
}


