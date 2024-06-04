import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useParams } from 'react-router-dom';
import "../styles/projectscreen.css";
import { ImageModal } from "../components/ImageModal";

export default function ProjectScreen() {
  const { id } = useParams();
  const cardRefs = useRef([]);
  const container = useRef(null);
  const imgContainerRefs = useRef([]);
  const imgRefs = useRef([]);
  const [projectData, setProjectData] = useState(null);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(`https://joseph-lapuz.onrender.com/Projects/${id}`);
      const json = await response.json();

      if (response.ok) {
        setProjectData(json);
        setProjectLoaded(true);
      }
    };

    fetchProjectData();
  }, [id]);

  useEffect(() => {
    if (projectLoaded) {
      window.scrollTo(0, 0);
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline();
      gsap.set(container.current, { visibility: "visible" });

      tl.fromTo(
        cardRefs.current.map(cardRef => cardRef.children),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "Start"
      );

      imgRefs.current.forEach((img, index) => {
        gsap.to(img, {
          y: (img.offsetHeight - imgContainerRefs.current[index].offsetHeight) * 0.1, // subtle parallax
          ease: "none",
          scrollTrigger: {
            trigger: imgContainerRefs.current[index],
            scrub: true,
            pin: false,
            invalidateOnRefresh: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    }
  }, [projectLoaded]);

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl("");
  }

  return (
    <div className="app">
      {!projectLoaded ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="content-about-resume" ref={container}>
          {projectData.items.map((item, index) => (
            <div
              key={index}
              className={index % 2 === 0 ? "left-to-right" : "right-to-left"}
              ref={el => (cardRefs.current[index] = el)}
            >
              <div className="title-body">
                <h1 className={index === 0 ? "main-title" : "sub-title"}>
                  {item.title}
                </h1>
                <p className="card-body">{item.description}</p>
              </div>
              <div className="card-img" ref={el => (imgContainerRefs.current[index] = el)}>
                <img
                  src={item.imgUrl}
                  alt={`${index + 1}`}
                  ref={el => (imgRefs.current[index] = el)}
                  onClick={() => openModal(item.imgUrl)}
                  className="clickable-image"
                />
              </div>
            </div>
          ))}
          <ImageModal isOpen={isModalOpen} imageUrl={modalImageUrl} onClose={closeModal} />
        </div>
      )}
    </div>
  );
}