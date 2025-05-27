import React from 'react'
import { useParams, NavLink } from "react-router-dom";
import {
    HomeOutlined,
} from '@ant-design/icons';

export default function BreadCrumb() {
    const { page_name } = useParams();
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><HomeOutlined style={{ fontSize: 20, marginRight: 10 }} /> <NavLink to="/" title="Inicio">INICIO</NavLink></li>
                {/* <li className="breadcrumb-item active" aria-current="page">{page_name.toLocaleUpperCase().replace(/\-/g, ' ')}</li> */}
                <li className="breadcrumb-item active" aria-current="page">REGISTRO FORO EMPRENDEDORES</li>
            </ol>
        </nav>
    )
}
