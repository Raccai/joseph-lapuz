import React, { useEffect, useState } from 'react';
import { uploadImage, uploadFile } from '../firebase/firebaseUpload';
import { useProjectsContext } from '../hooks/useProjectsContext';
import "../styles/addCardForm.css";
import { useAuthContext } from '../hooks/useAuthContext';

export const UpdateCardForm = ({ id }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [button, setButton] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("https://joseph-lapuz.onrender.com/Admin/Cards/" + id, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: "SET_CARD", payload: json});

        setTitle(json.title);
        setBody(json.body);
        setButton(json.button);
        setImgUrl(json.imgUrl);
        setFileUrl(json.fileUrl);
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [dispatch, id, user])

  const handleSubmitCard = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.")
      return;
    }

    console.log("Form submitted");
    setSuccess("");

    // Validation check
    if (!title || !body || !button || (!imgUrl && typeof imgUrl !== 'string') || (!fileUrl && typeof fileUrl !== 'string')) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading images...");
      let currentImgUrl = imgUrl;
      let currentFileUrl = fileUrl;

      if (imgUrl instanceof File) {
        currentImgUrl = await uploadImage(imgUrl);
      }

      if (fileUrl instanceof File) {
        currentFileUrl = await uploadFile(fileUrl);
      }

      console.log(currentFileUrl)

      const response = await fetch("https://joseph-lapuz.onrender.com/Admin/Cards/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title,
          body,
          button,
          imgUrl: currentImgUrl,
          fileUrl: currentFileUrl
        })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to update card.");
      }

      if (response.ok){
        setError("");
        setSuccess("Successfully updated a card!");

        dispatch({type: "UPDATE_CARD", payload: json})
      }
    } catch (error) {
      console.error("Error updating card: ", error);
      setError("Please fill in all the fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-card-container">
      <form className="add-card-form" onSubmit={handleSubmitCard}>
        <div className='add-card-wrapper'>
          <div className="input-containers">
            <label>Title:</label>
            <input
              type="text"
              placeholder={"Card title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-containers">
            <label>Body:</label>
            <textarea
              type="text"
              placeholder={"Card body"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              columns={4}
            />
          </div>

          <div className="input-containers">
            <label>Button Text:</label>
            <input
              type="text"
              placeholder={"Button text"}
              value={button}
              onChange={(e) => setButton(e.target.value)}
            />
          </div>

          <div className="input-containers">
            <label>Image:</label>
            <div className="images-section">
              {imgUrl && (
                <div className="image-preview">
                  <img
                    src={typeof imgUrl === "string" ? imgUrl : URL.createObjectURL(imgUrl)}
                    alt={"Card Preview"}
                  />
                </div>
              )}
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => setImgUrl(e.target.files[0])}
              />
            </div>
          </div>

          <div className="input-containers">
            <label>File (PDF):</label>
            <input
                type="file"
                className="custom-file-input"
                onChange={(e) => setFileUrl(e.target.files[0])}
              />
          </div>
        </div>

        <div className="bottom-btns">
          <button type="submit" className={loading ? "remove-btn-disabled" : "active-btn"} disabled={loading}>
            {loading ? "Updating Cards..." : "Edit Cards"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  )
}
