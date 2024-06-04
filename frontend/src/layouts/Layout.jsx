import React, { useState } from 'react'
import { Grip } from "lucide-react";
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emptyDivVisible, setEmptyDivVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  }

  const contentStyle = {
    transition: "opacity 0.3s ease-in-out"
  };

  function toggleEmptyDiv() {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setEmptyDivVisible(true);
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      setEmptyDivVisible(false);
      document.body.style.overflow = "visible"; // Enable scrolling
    }
  }  

  return (
    <div>
      <Sidebar open={sidebarOpen} toggleEmptyDiv={toggleEmptyDiv} enableToggle={window.innerWidth <= 1020} />
      <button className={isActive ? "sidebar-toggle active" : "sidebar-toggle"} onClick={() => {toggleEmptyDiv(); toggleActive()}}>
        <Grip />
      </button>

      {/* Empty div of black when the sidebar is open in smaller screens */}
      {sidebarOpen && (
        <div className="empty-div-black" onClick={() => setSidebarOpen(!sidebarOpen)}></div>
      )}

      <div 
        style={
          contentStyle
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Layout;