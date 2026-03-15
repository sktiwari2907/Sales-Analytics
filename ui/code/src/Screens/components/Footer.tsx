import React from 'react';
import { useState } from 'react';
import '../resources/index.css';
import Toolbar from './Toolbar';
import useMobile from '../hooks/useMobile.tsx';
import { useNavigate } from 'react-router-dom';

function Footer({setShowMenu}) {
  const isMobile = useMobile();
  const navigate= useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
  }
  return (
    <footer>
        <div className='footer'>
            <button type='button' className='home' onClick={() => handleNavigate('/dashboard')}></button>
            {/* <button className='bookMark' onClick={() => handleNavigate('admin/sales')}></button> */}
            <button className='menu'  onClick={() => setShowMenu(prev => !prev)}></button>
        </div>
    </footer>
  )
}

export default Footer