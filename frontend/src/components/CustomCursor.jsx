import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const location = useLocation();
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    const mediaQuery = window.matchMedia('(max-width: 1280px)');
    setIsScreenSmall(mediaQuery.matches);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const onMoveCursor = (event) => {
    if (!cursorRef.current || !followerRef.current) return;

    const { clientX, clientY } = event;
    gsap.to(cursorRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.1,
    });
    gsap.to(followerRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.4,
    });
  };

  const onMouseEnterButton = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { scale: 4 });
  };

  const onMouseLeaveButton = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { scale: 1 });
  };

  useEffect(() => {
    if (location.pathname === "/Login" || location.pathname === "/Admin" || !isScreenSmall) {
      gsap.to(cursorRef.current, {
        xPercent: -32,
        yPercent: -32,
      });
      gsap.to(followerRef.current, {
        xPercent: -44,
        yPercent: -44,
      });

      document.addEventListener('mousemove', onMoveCursor);

      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button');
      const inputs = document.querySelectorAll('input');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', onMouseEnterButton);
        button.addEventListener('mouseleave', onMouseLeaveButton);
      });

      links.forEach((link) => {
        link.addEventListener('mouseenter', onMouseEnterButton);
        link.addEventListener('mouseleave', onMouseLeaveButton);
      });

      inputs.forEach((input) => {
        input.addEventListener('mouseenter', onMouseEnterButton);
        input.addEventListener('mouseleave', onMouseLeaveButton);
      });

      return () => {
        document.removeEventListener('mousemove', onMoveCursor);
        buttons.forEach((button) => {
          button.removeEventListener('mouseenter', onMouseEnterButton);
          button.removeEventListener('mouseleave', onMouseLeaveButton);
        });
        links.forEach((link) => {
          link.removeEventListener('mouseenter', onMouseEnterButton);
          link.removeEventListener('mouseleave', onMouseLeaveButton);
        });
        inputs.forEach((input) => {
          input.removeEventListener('mouseenter', onMouseEnterButton);
          input.removeEventListener('mouseleave', onMouseLeaveButton);
        });
      };
    }
  }, [location, isScreenSmall]);

  if (location.pathname === "/Login" || location.pathname === "/Admin" || isScreenSmall) {
    return null;
  }

  return (
    <div>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="follower" id="follower" ref={followerRef}></div>
    </div>
  );
}