import React, { useEffect } from 'react'
import { Loader } from 'rsuite'
import jQuery from 'jquery';


const Loading = () => {
    useEffect(() => {
        setTimeout(() => {
            jQuery(".loading").fadeOut({
                easing:'linear',
                duration:'slow'
            })
        }, 3000);
    },[]);
    return (

        <div className="loading">
            <div className="loader">
                <Loader inverse center size='md' />
            </div>
        </div>
    )
}

export default Loading