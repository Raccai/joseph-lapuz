import React, { useEffect, useState } from 'react';
import "../styles/projectList.css";
import { useProjectsContext } from '../hooks/useProjectsContext';
import { UpdateProjectForm } from './UpdateProjectForm';
import { useAuthContext } from '../hooks/useAuthContext';

export const ProjectList = () => {
  const { projects, dispatch } = useProjectsContext();
  const [updateForm, setUpdateForm] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    setUpdateForm(false);
  }, [])

  const handleDelete = async (id) => {
    if (!user) {
      setError("You must be logged in.")
      return;
    }

    setSuccess("");
    setError("");

    const response = await fetch("/Admin/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    console.log(projects);

    if (response.ok) {
      dispatch({type: "DELETE_PROJECT", payload: json})
      setSuccess(`Successfully deleted project!`)
    } else {
      setError(`Could not delete project.`)
    }
  }

  const handleUpdate = async(id) =>{
    setUpdateForm(true);
    setProjectId(id)
  }

  return (
    <div className="list-container">
      {!updateForm ? (
        <div className='list-wrapper'>
          {projects && projects.map((project, index) => (
            <div key={index} className='list-item'>
              <div className="title">{project.items[0].title}</div>
              <div className="buttons">
                <button onClick={() => handleDelete(project._id)} id="delete-project">Delete</button>
                <button onClick={() => handleUpdate(project._id)} id="update-project">Update</button>
              </div>
            </div>
          ))}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      ) : (
        <UpdateProjectForm id={projectId} />
      )}
    </div>
  )
}
