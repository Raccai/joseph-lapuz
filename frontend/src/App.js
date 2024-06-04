import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Projects from "./screens/Projects";
import CVResume from "./screens/CVResume";
import About from "./screens/about";
import ProjectScreen from "./screens/ProjectScreen";
import { Admin } from "./screens/Admin";
import { Login } from "./screens/Login"
import "./styles/index.css";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div>
        <Preloader />
        <BrowserRouter>
          <CustomCursor />  
          <Layout>
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/About" element={<About />} />
              <Route path="/CVResume" element={<CVResume />} />
              <Route path="/Project/:id" element={<ProjectScreen />} />
              <Route path="/Admin" element={user ? <Admin /> : <Login />} />
              <Route path="/Login" element={!user ? <Login /> : <Admin />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
