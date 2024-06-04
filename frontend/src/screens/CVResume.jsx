import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/cvresume.css";
import '../styles/fonts.css';
import { useCardsContext } from '../hooks/useCardsContext';

const CVResume = () => {
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const { cards, dispatch } = useCardsContext();
  let cardRefs = useRef([]);
  let contentRefs = useRef([]);
  let imgContainerRefs = useRef([]);

  useEffect(() => {
    setCardsLoaded(false);

    const fetchCards = async() => {
      const response = await fetch("/Cards");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CARDS", payload: json })
        setCardsLoaded(true);
      }
    }

    fetchCards();
  }, [dispatch])

  useEffect(() => {
    if (cardsLoaded) {

      window.scrollTo(0, 0);
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline();

      cards.forEach((_, index) => {
        const content = contentRefs.current[index];
        const imgContainer = imgContainerRefs.current[index];
        const [contentH, contentP, contentB] = content.children;
        const img = imgContainer.children[0];

        gsap.set(cardRefs.current[index], { visibility: "hidden" });

        gsap.set(cardRefs.current[index], { visibility: "visible" });
        tl.from([img, contentH, contentP, contentB], {
          x: 100,
          opacity: 0,
          duration: 0.4,
          stagger: 0.2,
        }, "Start")
          .to([img, contentH, contentP, contentB], {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.2,
          }, "Start");

        // parallax effects
        gsap.to(
          img,
          {
            y: () => (img.offsetHeight - imgContainer.offsetHeight) * 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: imgContainer,
              scrub: true,
              pin: false,
              invalidateOnRefresh: true,
              start: "top bottom",
              end: "bottom top",
            }
          }
        )
      })
  
    }
  }, [cardsLoaded, cards])

  return (
    <div className="app">
      {!cardsLoaded ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ):(
        <section className="content-about-resume">
          {cards.map((card, index) => (
            <div
              className="card-container"
              ref={(el) => cardRefs.current[index] = el}
              key={index}
            >
              <div
                className="card-content"
                ref={(el) => contentRefs.current[index] = el}
              >
                <h1>{card.title}</h1>
                <p>{card.body}</p>
                <a className="button" href={card.fileUrl} target="_blank" rel="noreferrer">{card.button}</a>
              </div>
              <div className="card-img" ref={(el) => imgContainerRefs.current[index] = el}>
                <img src={card.imgUrl} alt="Resume" />
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default CVResume;
