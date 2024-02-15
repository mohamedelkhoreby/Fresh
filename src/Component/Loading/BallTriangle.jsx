import React from 'react'
import { BallTriangle } from 'react-loader-spinner';

export default function BallTriangleLoading() {
    return <>
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
    </>
}
