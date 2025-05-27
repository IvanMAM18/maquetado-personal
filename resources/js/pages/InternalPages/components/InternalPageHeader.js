import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import BreadCrumb from './BreadCrumb'
export default function InternalPageHeader() {
    const { page_name } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <h1>REGISTRO FORO EMPRENDEDORES (DESACTIVADO)</h1>
            {/* <h1>{page_name.toLocaleUpperCase().replace(/\-/g, ' ')}</h1> */}
            <BreadCrumb />
        </>
    )
}
