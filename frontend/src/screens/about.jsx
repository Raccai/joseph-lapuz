import React, { useRef, useEffect, useState } from 'react'
import { gsap } from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'
import img2 from "../imgs/pink-mask.png"
import '../styles/about.css'
import '../styles/fonts.css'
import Header from '../components/Header'
import { useAboutContext } from "../hooks/useAboutContext"

const About = () => {
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const { about, dispatch } = useAboutContext();

  let containerRef = useRef(null);
  let img1Ref = useRef(null);
  let img2Ref = useRef(null);
  let img3Ref = useRef(null);
  let contentRef = useRef(null);

  useEffect(() => {
    setAboutLoaded(false)

    const fetchAbout = async () => {
      const response = await fetch("https://joseph-lapuz-api.vercel.app/About")
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ABOUT", payload: json })
        setAboutLoaded(true)
      }
    }

    fetchAbout();
  }, [dispatch])

  useEffect(() => {
    if (aboutLoaded) {
      window.scrollTo(0, 0);
      gsap.registerPlugin(ScrollTrigger);
      const img1 = img1Ref.current;
      const img2 = img2Ref.current;
      const img3 = img3Ref.current;
      const title = contentRef.children[0];
      const paragraph = contentRef.children[1];
      
      gsap.set(containerRef, {visibility: "hidden"});
      gsap.set(contentRef, {visibility: "hidden"});
  
      const tl = gsap.timeline();
      
      gsap.set(containerRef, {visibility: "visible", overflow: "hidden"});
      tl.from(
        [img1, img2, img3],
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        },
        "Start"
      ).to(
        [img1, img2, img3],
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        },
        "Start"
      )
      .add(() => {
        gsap.set(contentRef, { visibility: "visible", overflow: "hidden"});
        tl.from([title, paragraph], {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        }, "Start")
        .to([title, paragraph], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        })
      }, "Start");
  
      // parallax effect
      gsap.to(
        img1.children[0],
        {
          y: () => (img1.children[0].offsetHeight - img1.offsetHeight) * 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: img1Ref.current,
            scrub: true,
            invalidateOnRefresh: true,
            start: "top center",
            end: "bottom center",
          }
        }
      )
  
      gsap.to(
        img3.children[0],
        {
          y: () => (img3.children[0].offsetHeight - img3.offsetHeight) * 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: img3Ref.current,
            scrub: true,
            invalidateOnRefresh: true,
            start: "top center",
            end: "bottom center",
          }
        }
      )
    }
  }, [aboutLoaded])

  return (
    <div 
      className="app"
    >
      {!aboutLoaded ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ):(
        <section 
          className="content-about-resume"
          ref={el => containerRef = el}  
        >
          <Header />
          <div className="aboutImages" >
            <div className="aboutImage" ref={img1Ref}>
              <img src={about.imgUrl1} alt="1" />
            </div>
            <div className="aboutImage" ref={img2Ref}>
              <img src={img2} alt="2" />
            </div>
            <div className="aboutImage" ref={img3Ref}>
              <img src={about.imgUrl2} alt="3" />
            </div>
          </div>
          <section 
            className="aboutText"
            ref={el => contentRef = el}        
          >
            <div className="aboutTitle">
              <h1>{about.title}</h1>
            </div>
            <div className="aboutBody">
              <p>{about.body}</p>
            </div>
          </section>
        </section>
      )}
    </div>
  )
}

export default About;