import React, { useState } from 'react';
import "../styles/admin.css";
import { ProjectList } from '../forms/ProjectList';
import { AddProjectForm } from '../forms/AddProjectForm';
import { AboutForm } from "../forms/AboutForm";
import { CardList } from "../forms/CardList";
import { useLogout } from '../hooks/useLogout';

export const Admin = () => {
  const [activeAdd, setActiveAdd] = useState(true);
  const [activeDeleteUpdate, setActiveDeleteUpdate] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
  const [activeCards, setActiveCards] = useState(false);
  const { logout } = useLogout();

  const handleActive = (toBeActive) => {
    if (toBeActive === "Add") {
      setActiveAdd(true);
      setActiveDeleteUpdate(false);
      setActiveAbout(false);
      setActiveCards(false);
    }

    if (toBeActive === "DeleteUpdate") {
      setActiveAdd(false);
      setActiveDeleteUpdate(true);
      setActiveAbout(false);
      setActiveCards(false);
    }

    if (toBeActive === "About") {
      setActiveAdd(false);
      setActiveDeleteUpdate(false);
      setActiveAbout(true);
      setActiveCards(false);
    }

    if (toBeActive === "Cards") {
      setActiveAdd(false);
      setActiveDeleteUpdate(false);
      setActiveAbout(false);
      setActiveCards(true);
    }
  }

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="cover-admin">
      <div className="desktop-notice">
        <p>Admin only accessible on desktop</p>
      </div>
      <div className="admin-form-container">
        <nav>
          <button 
            onClick={() => handleActive("Add")} 
            className={activeAdd === true ? "active-btn" : ""}
          >
            Add
          </button>
          <button 
            onClick={() => handleActive("DeleteUpdate")} 
            className={activeDeleteUpdate === true ? "active-btn" : ""}
          >
            Delete & Update
          </button>
          <button 
            onClick={() => handleActive("About")} 
            className={activeAbout === true ? "active-btn" : ""}
          >
            Edit About
          </button>
          <button 
            onClick={() => handleActive("Cards")} 
            className={activeCards === true ? "active-btn" : ""}
          >
            Edit CV/Resume
          </button>
          <button 
            onClick={handleLogout} 
          >
            Logout
          </button>
        </nav>

        <div className="admin-form-wrapper">
          {activeAdd && (
            <div className="admin-form">
              <div className="headers">
                <h1>Add Project</h1>
                <h4>Add a new project with its own set of fields</h4>
              </div>
              <AddProjectForm />
            </div>
          )}

          {activeAbout && (
            <div className="admin-form">
              <div className="headers">
                <h1>Edit About Section</h1>
                <h4>Edit the content in the about page</h4>
              </div>
              <AboutForm />
            </div>
          )}

          {activeCards && (
            <div className="admin-form">
              <div className="headers">
                <h1>Edit CV/Resume Section</h1>
                <h4>Edit the content in the CV/Resume page</h4>
              </div>
              <CardList />
            </div>
          )}

          {activeDeleteUpdate && (
            <div className="admin-form">
              <div className="headers">
                <h1>Update/Delete Project</h1>
                <h4>Change project info or delete entire projects</h4>
              </div>
              <ProjectList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};