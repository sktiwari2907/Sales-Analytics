import { useState, useRef, useEffect, useContext, useMemo } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../store/AuthContext";
import { GlobalContext } from "../store/GlobalContext";
import { useQueryClient } from "@tanstack/react-query";

type ToolbarProps = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function Toolbar({setShowMenu}: ToolbarProps) {
  const menuRef = useRef(null);
  const logoutRef = useRef(null);
  const {userDetails, logout, setUserDetails} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogoutVisible, setLogoutVisible] = useState(false);

  const {getACLByScreen, acl} = useContext(GlobalContext);

  const aclData = getACLByScreen("toolbar");

  const queryClient = useQueryClient();

  const onClick = async() => {
    const result = await logout();

    if (result?.status !== "success") {
        throw new Error(result?.error || "Unknown server error");
    }

    setUserDetails(null);

    queryClient.clear();

    navigate("/login");
    
  }

  const toolbar = [
    {
      url: '/dashboard',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" className="dashboardIcon"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.2" /><path d="M12 3 V12 H21 A9 9 0 0 0 12 3 Z" fill="white" /></svg>,
      name: 'Dashboard',
      key: 'dashboard'
    },
    {
      url: 'admin/admin_dashboard',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="3" stroke="white" stroke-width="2" stroke-linejoin="round"/><path d="M9 7V5C9 4.4477 9.4477 4 10 4H14C14.5523 4 15 4.4477 15 5V7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="10" y="11" width="4" height="4" rx="1" stroke="white" stroke-width="2"/><path d="M3 11L12 14L21 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
      name: 'Admin Dashboard',
      key: 'admin'
    }
  ]
  const handleOutSideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
    if (logoutRef.current && !logoutRef.current.contains(event.target)) {
      setLogoutVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('pointerdown', handleOutSideClick);

    return () => document.removeEventListener('pointerdown', handleOutSideClick);
  }, [setShowMenu, setLogoutVisible]);

  return (
    <div className="toolbar" ref={menuRef}>
      <div className="menuTitle">
        <Logo width={270} transparent={true} variant="dark"/>
      </div>
      <ul className="toolbarU">
        {toolbar
        ?.filter(item => aclData?.config?.[item.key]?.visible)
        .map((data) => {
          return (
            <NavLink
            to={data.url}
            key={data.key}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <li className="toolbarList">
              {data.icon}
              <span className="toolbarText">{data.name}</span>
            </li>
          </NavLink>

          )
        })}
          
        <div className="profile">
        <div className="profile-left">
          <div className="avatar">{userDetails?.username[0].toUpperCase()}</div>

          <div className="profile-info">
            <span className="username">{userDetails?.username}</span>
            <span className="role">{userDetails?.role_name}</span>
          </div>
        </div>

        <div style={{position: "relative"}}>
          <button className="profile-menu" onClick={() => setLogoutVisible(true)}>⋮</button>
          {isLogoutVisible && <button ref={logoutRef} className="logout" style={{position: "absolute", top: 0}} onClick={onClick}>Logout</button>}
        </div>
        
      </div>
      </ul>
      
    </div>
  )
}

export default Toolbar