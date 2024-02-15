import React from 'react'
import { ThreeCircles } from 'react-loader-spinner';
export default function Loading() {
    return <div className="loading">
        <ThreeCircles
            visible={true}
            width="500"
            color="#4fa94d" 
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass="d-flex justify-content-center mt-5"
        />

    </div>
}
