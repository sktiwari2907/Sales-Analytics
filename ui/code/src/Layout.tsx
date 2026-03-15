import React from 'react'
import Header from './Screens/components/Header'
import Footer from './Screens/components/Footer'
import Toolbar from './Screens/components/Toolbar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import useMobile from './Screens/hooks/useMobile';
import Loader from './Screens/components/Loader';

function Layout() {
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(true);
    const isMobile = useMobile();
  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
        {/* {loading && <Loader />} */}
        {showMenu && <Toolbar setShowMenu ={setShowMenu}></Toolbar>}
        <div className="layout">
          <Header setShowMenu ={setShowMenu}></Header>
          <main className="content">
            <Outlet />
          </main>
          {isMobile && <Footer setShowMenu ={setShowMenu}></Footer>}
        
      </div>
    </div>
  )
}

export default Layout