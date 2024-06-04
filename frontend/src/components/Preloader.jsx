import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import "../styles/preloader.css";

export default function Preloader() {
  let counterRef = useRef(null);
  let overlayRef = useRef(null);
  let currentVal = 0;

  const updateCounter = () => {
    if (!counterRef.current) {
      return;
    }

    if (currentVal >= 100) {
      return;
    }

    currentVal += Math.floor(Math.random() * 10) + 5;

    if (currentVal > 100) {
      currentVal = 100;
    }

    counterRef.current.textContent = currentVal;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  };

  useEffect(() => {
    const timeoutId = setTimeout(updateCounter, 50); // Initial call

    gsap.to(
      [counterRef.current, overlayRef.current],
      {
        duration: 1.25,
        delay: 2.5,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    gsap.to(
      [counterRef.current, overlayRef.current],
      {
        delay: 3.5,
        visibility: "hidden",
      }
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="counter" ref={counterRef}>0</div>
      <div className="overlay" ref={overlayRef}></div>
    </>
  );
}
