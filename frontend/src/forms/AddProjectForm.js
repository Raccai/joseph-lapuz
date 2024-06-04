import React, { useEffect, useState } from 'react';
import { uploadImage } from '../firebase/firebaseUpload';
import { useProjectsContext } from '../hooks/useProjectsContext';
import "../styles/addProjectForm.css";
import { useAuthContext } from '../hooks/useAuthContext';

export const AddProjectForm = () => {
  const [fields, setFields] = useState([
    {title: "", description: "", image: null},
    {title: "", description: "", image: null},
    {title: "", description: "", image: null}
  ])
  const [projectLink, setProjectLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("https://joseph-lapuz.onrender.com/Admin", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: "SET_PROJECTS", payload: json});
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [dispatch, user])

  const handleAddField = () => {
    setFields([...fields, {title: "", description: "", image: null}])
  };

  const handleRemoveField = (index) => {
    if (fields.length > 3) {
      setFields(fields.filter((_, i) => i !== index))
    } else {
      alert("You must have at least 3 sets of titles, descriptions, and images")
    }
  };

  const handleChangeField = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleChangeImage = (index, file) => {
    const newFields = [...fields];
    newFields[index].image = file;
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.")
      return;
    }

    console.log("Form submitted");
    setSuccess("");

    // Validation check
    for (let field of fields) {
      if (!field.title || !field.description || (!field.image && typeof field.image !== 'string')) {
        setError("Please fill in all the fields.");
        return;
      }
    }

    if (fields.length < 3) {
      alert("Please provide at least 3 sets of titles, descriptions, and images");
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading images...");
      const imageUrls = await Promise.all(fields.map(field => uploadImage(field.image)));
      console.log("Images uploaded: ", imageUrls);

      const projectData = {
        titles: fields.map(field => field.title),
        descriptions: fields.map(field => field.description),
        imgUrls: imageUrls,
        link: projectLink
      };

      console.log("Adding project with data: ", projectData);
      const response = await fetch("https://joseph-lapuz.onrender.com/Admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(projectData)
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to add project.");
      }

      if (response.ok){
        setFields([
          {title: "", description: "", image: null},
          {title: "", description: "", image: null},
          {title: "", description: "", image: null}
        ])
        setProjectLink("");
        setError("");
        setSuccess("Successfully added a project!");

        dispatch({type: "CREATE_PROJECT", payload: json})
      }
    } catch (error) {
      console.error("Error adding project: ", error);
      setError("Please fill in all the fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container">
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div className='form-wrapper' key={index}>
            <input
              type="text"
              placeholder={`Title ${index + 1}`}
              value={field.title}
              onChange={(e) => handleChangeField(index, "title", e.target.value)}
            />
            <textarea
              type="text"
              placeholder={`Description ${index + 1}`}
              value={field.description}
              onChange={(e) => handleChangeField(index, "description", e.target.value)}
              rows={4}
              columns={4}
            />
            <div className="images-section">
              {field.image && (
                <div className="image-preview">
                  <img
                    src={typeof field.image === "string" ? field.image : URL.createObjectURL(field.image)}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              )}
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => handleChangeImage(index, e.target.files[0])}
              />
            </div>

            <button type="button" className={fields.length <= 3 ? "remove-btn-disabled" : "active-btn"} disabled={fields.length <= 3} onClick={() => handleRemoveField(index)}>Remove Set</button>
          
          </div>
        ))}

        <div className="bottom-btns">
          <button type="button" className="active-btn" onClick={handleAddField}>Add Set</button>
          <button type="submit" className={loading ? "remove-btn-disabled" : "active-btn"} disabled={loading}>
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  )
}
