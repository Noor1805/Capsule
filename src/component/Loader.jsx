import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const capsuleRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let text = "capsule";
    let current = "";
    let index = 0;

    const typeInterval = setInterval(() => {
      current += text[index];
      textRef.current.textContent = current;
      index++;
      if (index === text.length) {
        clearInterval(typeInterval);

        const tl = gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
            onComplete?.();
          },
        });

        tl.to(fillRef.current, {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
          onStart: () => {
            textRef.current.style.color = "#000";
          },
        });

        tl.to(
          textRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=1.2"
        );

        tl.to(
          fillRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.5"
        );

        tl.to(capsuleRef.current, {
          filter: "blur(10px)",
          scale: 20,
          duration: 1.2,
          ease: "power4.inOut",
        });

        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [onComplete]);

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="capsule" ref={capsuleRef}>
        <div className="fill" ref={fillRef}></div>
        <span className="text" ref={textRef}></span>
      </div>

      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
        }

        /* More visible grid pattern */
        .overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 25px 25px;
          pointer-events: none;
          z-index: 0;
        }

        .capsule {
          position: relative;
          width: 300px;
          height: 80px;
          border: 2px solid white;
          border-radius: 100px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          z-index: 10;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          animation: glow 2s ease-in-out infinite alternate;
          color: white;
          background: transparent;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
          to {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
          }
        }

        .fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          background: white;
          z-index: 1;
        }

        .text {
          position: relative;
          z-index: 2;
          color: white;
          transition: color 0.5s ease, opacity 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default Loader;

