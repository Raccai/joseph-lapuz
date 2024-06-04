import React from 'react'
import "../styles/darkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  }
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  }
  
  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark"){
    setDarkMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }

  return (
    <div className="dark-mode">
      <label className="dark-mode-label">Theme Toggle</label>
      <input 
        type="checkbox" 
        className="dark-mode-input"
        id="dark-mode-input"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
    </div>
  )
}


export default DarkMode;