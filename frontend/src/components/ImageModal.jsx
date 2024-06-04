import React, { useEffect, useRef } from 'react'
import "../styles/imageModal.css"
import gsap from 'gsap';

export const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  let overlayRef = useRef(null);
  let contentRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1 }
      )
    }
  }, [isOpen])

  const handleOnClose = () => {
    gsap.fromTo(overlayRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.5 }
    )
    gsap.fromTo(contentRef.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: -100, duration: 1, onComplete: () => {
        onClose();
      } }
    )
  }
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} ref={overlayRef}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={contentRef}>
        <button className="modal-close" onClick={handleOnClose}>
          &times;
        </button>
        <img src={imageUrl} alt="Full View" className="modal-image" />
      </div>
    </div>
  )
}
