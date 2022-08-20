import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from '../components/home/Home'
import Ingredientes from '../components/ingredientes/Ingredientes'
import Lanches from '../components/lanches/Lanches'

export default props =>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/ingredientes' element={<Ingredientes />} />
        <Route path='/lanches' element={<Lanches />} />
        <Route path="*" element={<Home />} />
    </Routes>