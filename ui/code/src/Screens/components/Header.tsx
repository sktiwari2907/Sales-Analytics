import { useState } from 'react';
import '../resources/index.css';
import Toolbar from './Toolbar';
import useMobile from '../hooks/useMobile.tsx';
import SVGIcons from '../../SVGIcons.jsx';
import Logo from './Logo.tsx';

type HeaderProps = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({setShowMenu}: HeaderProps) {
  const isMobile = useMobile();
  return (
    <header>
        <div className="header">
            {!isMobile && <button type="button" className='menuBtn' onClick={() => setShowMenu(prev => !prev)}></button>}
            <Logo width={275} transparent />
        </div>
    </header>
  )
}

export default Header;