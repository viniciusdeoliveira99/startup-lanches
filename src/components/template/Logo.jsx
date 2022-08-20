import './Logo.css'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/burgerimg.png'

export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="burgerhouse" />
        </Link>
    </aside>