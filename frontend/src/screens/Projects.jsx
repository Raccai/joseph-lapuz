import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import { useProjectsContext } from "../hooks/useProjectsContext";

const Projects = () => {
  const app = useRef(null);
  const imageBoxes = useRef([]);
  const images = useRef([]);
  const sliderRef = useRef(null);
  const { projects, dispatch } = useProjectsContext();
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    setProjectsLoaded(false);

    const fetchProjects = async () => {
      const response = await fetch("https://joseph-lapuz.onrender.com/Projects");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
        setProjectsLoaded(true);
      }
    };

    fetchProjects();
  }, [dispatch]);

  useEffect(() => {
    if (projectsLoaded) {
      window.scrollTo(0, 0);
      gsap.set(app.current, { visibility: "visible" });

      gsap.fromTo(
        sliderRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out",
          delay: 0.2,
        }
      );

      // Animate each image box individually
      imageBoxes.current.forEach((imageBox, index) => {
        gsap.fromTo(
          imageBox,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out",
            delay: index * 0.1,
          }
        );

        // Add hover animation
        imageBox.addEventListener("mouseenter", () => {
          gsap.to(imageBox, { scale: 1.04, ease: "power3.out", duration: 0 });
        });

        imageBox.addEventListener("mouseleave", () => {
          gsap.to(imageBox, { scale: 1, ease: "power3.out", duration: 0.01 });
        });
      });

      // Animate each image individually
      images.current.forEach((image, index) => {
        gsap.fromTo(
          image,
          {
            scale: 1.6,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "circ.out",
            delay: index * 0.2,
          }
        );
      });

      images.current.forEach((image, index) => {
        gsap.to(image, {
          y: (image.offsetHeight - imageBoxes.current[index].offsetHeight) * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: imageBoxes.current[index],
            scrub: true,
            pin: false,
            invalidateOnRefresh: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    }
  }, [projectsLoaded]);
  
  const sliderProjects = projects ? projects.slice(0, 5) : [];

  return (
    <div className="app">
      <div className="content-and-slider" ref={app}>
        {/* For Image Slider */}
        <div
          style={{
            maxWidth: "1200px",
            width: "100vw",
            height: "100%",
          }}
          ref={sliderRef}
        >
          <Slider slides={sliderProjects} />
        </div>

        {/* For actual projects */}
        <div className="content">
          {projects &&
            projects.map((project, index) => (
              <Link key={index} to={`/Project/${project._id}`}>
                <div
                  className="image-box"
                  ref={(el) => (imageBoxes.current[index] = el)}
                >
                  <img
                    src={project.items[0].imgUrl}
                    alt={project.items[0].title}
                    ref={(imgRef) => (images.current[index] = imgRef)}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
