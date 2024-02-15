import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function Logout() {
    let navigate = useNavigate();
    let { setUserToken } = useContext(UserContext);

    function Logout() {
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.removeItem('userToken'));
            navigate('/login');
        }
    }
    useEffect(() => {
        Logout();
    })
    return <>
    </>
}
