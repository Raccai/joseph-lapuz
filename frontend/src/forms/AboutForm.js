import React, { useEffect, useState } from 'react';
import { uploadImage } from '../firebase/firebaseUpload';
import "../styles/aboutForm.css";
import { useAuthContext } from '../hooks/useAuthContext';
import { useAboutContext } from '../hooks/useAboutContext';

export const AboutForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl1, setImgUrl1] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAboutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAbout = async () => {
      if (user) {
        const response = await fetch("https://joseph-lapuz.onrender.com/Admin/About", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        console.log(response)
        console.log(json)

        if (response.ok) {
          const about = json;
          setTitle(about.title);
          setBody(about.body);
          setImgUrl1(about.imgUrl1);
          setImgUrl2(about.imgUrl2);

          dispatch({ type: "UPDATE_ABOUT", payload: about })
        }
      }
    };

    fetchAbout();
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    setSuccess("");
    if (!title || !body || (!imgUrl1 && typeof imgUrl1 !== 'string') || (!imgUrl2 && typeof imgUrl2 !== 'string')) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    try {
      let image1Url = imgUrl1;
      let image2Url = imgUrl2;

      if (imgUrl1 instanceof File) {
        image1Url = await uploadImage(imgUrl1);
      }

      if (imgUrl2 instanceof File) {
        image2Url = await uploadImage(imgUrl2);
      }

      const response = await fetch("https://joseph-lapuz.onrender.com/Admin/About", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title,
          body,
          imgUrl1: image1Url,
          imgUrl2: image2Url,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to update about section.");
      } else {
        setError("");
        setSuccess("Successfully updated about section!");
      }
    } catch (error) {
      console.error("Error updating about section: ", error);
      setError("Please fill in all the fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container">
      <form onSubmit={handleSubmit}>
        <div className='about-form form-wrapper'>

          <label>Title:</label>
          <input
            type="text"
            placeholder={"About title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Body:</label>
          <textarea
            type="text"
            placeholder={"About body"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
          />

          <label>Image 1:</label>
          <div className="images-section">
            <div className="image-preview">
              <img
                src={typeof imgUrl1 === "string" ? imgUrl1 : URL.createObjectURL(imgUrl1)}
                alt={"Preview 1"}
              />
            </div>
            <input
              type="file"
              className="custom-file-input"
              onChange={(e) => setImgUrl1(e.target.files[0])}
            />
          </div>

          <label>Image 2:</label>
          <div className="images-section">
            <div className="image-preview">
              <img
                src={typeof imgUrl2 === "string" ? imgUrl2 : URL.createObjectURL(imgUrl2)}
                alt={"Preview 2"}
              />
            </div>
            <input
              type="file"
              className="custom-file-input"
              onChange={(e) => setImgUrl2(e.target.files[0])}
            />
          </div>

        </div>

        <div className="bottom-btns">
          <button type="submit" className={loading ? "remove-btn-disabled" : "active-btn"} disabled={loading}>
            {loading ? "Updating About..." : "Edit About"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}