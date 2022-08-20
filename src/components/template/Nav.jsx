import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHouse, faList } from '@fortawesome/free-solid-svg-icons';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <FontAwesomeIcon icon={faHouse} /> Início
            </Link>
            <Link to="/ingredientes">
                <FontAwesomeIcon icon={faList} /> Ingredientes
            </Link>
            <Link to="/lanches">
                <FontAwesomeIcon icon={faBurger} /> Lanches
            </Link>
        </nav>
    </aside>