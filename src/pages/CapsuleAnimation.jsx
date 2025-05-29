import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg1 from "../assets/bg1.avif";
import bg2 from "../assets/bg2.avif";

gsap.registerPlugin(ScrollTrigger);

const MarqueeLoop = () => {
  const marqueeContainerRef = useRef(null);
  const marqueeContentRef = useRef(null);
  const imageContainerRef1 = useRef(null);
  const imageContainerRef2 = useRef(null);
  const innerTextRef1 = useRef(null);
  const innerTextRef2 = useRef(null);
  const marqueeSectionRef = useRef(null);

  const [revealContent, setRevealContent] = useState(false);

  useEffect(() => {
    const container = marqueeContainerRef.current;
    const content = marqueeContentRef.current;
    const totalWidth = content.offsetWidth;

    const clone = content.cloneNode(true);
    container.appendChild(clone);

    gsap.set(container, { x: 0 });
    gsap.to(container, {
      x: `-${totalWidth}px`,
      duration: 90,
      ease: "linear",
      repeat: -1,
    });

    const letters1 = innerTextRef1.current?.querySelectorAll("span");
    const letters2 = innerTextRef2.current?.querySelectorAll("span");

    if (letters1) gsap.set(letters1, { opacity: 0, x: -30 });
    if (letters2) gsap.set(letters2, { opacity: 0, x: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: marqueeSectionRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(imageContainerRef1.current, {
      width: "98vw",
      height: "98vh",
      top: "30%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      duration: 7,
      ease: "power2.out",
      onUpdate: () => {
        if (!imageContainerRef1.current) return; // Guard check

        const rect = imageContainerRef1.current.getBoundingClientRect();
        if (rect.height >= window.innerHeight * 0.98) {
          setRevealContent(true);
          if (letters1) {
            gsap.to(letters1, {
              opacity: 1,
              x: 0,
              stagger: 0.06,
              ease: "power4.out",
              duration: 0.8,
            });
          }
        }
      },
    });

    tl.to(
      imageContainerRef1.current,
      {
        scale: 0.6,
        opacity: 0,
        duration: 7,
        ease: "power2.inOut",
      },
      "+=0.3"
    );

    tl.fromTo(
      imageContainerRef2.current,
      {
        y: "100vh",
        scale: 0.6,
        opacity: 0,
        width: "44rem",
        height: "20rem",
      },
      {
        y: 0,
        width: "99vw",
        height: "99vh",
        top: "30%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        opacity: 1,
        borderRadius: "2rem",
        duration: 7,
        ease: "power2.inOut",
        onUpdate: () => {
          if (!imageContainerRef2.current) return; // Guard check

          const rect2 = imageContainerRef2.current.getBoundingClientRect();
          if (rect2.top < window.innerHeight * 0.7) {
            if (letters2) {
              gsap.to(letters2, {
                opacity: 1,
                x: 0,
                stagger: 0.06,
                ease: "power4.out",
                duration: 0.8,
              });
            }
          }
        },
      },
      "<"
    );
    return () => {
      container.removeChild(clone);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={marqueeSectionRef}
      className="relative w-full h-[165vh] overflow-hidden"
      style={{ userSelect: "none" }}
    >
      <div
        className="absolute top-1/4 left-0 w-full overflow-hidden -translate-y-1/2 z-[-1]"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="flex whitespace-nowrap"
          ref={marqueeContainerRef}
          style={{ willChange: "transform" }}
        >
          <div className="flex" ref={marqueeContentRef}>
            {Array(10)
              .fill("Capsules®")
              .map((word, index) => (
                <span
                  key={index}
                  className="mx-16 text-[10rem] font-bold select-none text-white"
                >
                  {word}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div
        ref={imageContainerRef1}
        className="absolute top-[7rem] left-[23rem] w-[44rem] h-[20rem] rounded-[4rem] overflow-hidden z-20 pointer-events-none"
        style={{ willChange: "width, height, transform, top, left" }}
      >
        <img
          src={bg1}
          alt="capsule"
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute top-[8rem] left-1/2 -translate-x-1/2 z-30 text-white w-[44rem] transition-opacity duration-700 ${
            revealContent
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <h1
            ref={innerTextRef1}
            className="relative ml-[-22rem] mt-[14rem] w-[40rem] text-7xl"
          >
            {"Terrace Capsules®".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block opacity-0"
                style={{ transform: "translateX(-30px)" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h1 className="absolute text-6xl right-[-24rem] top-[13rem]">
            (scroll)
          </h1>

          <span className="absolute rounded-full h-[3.5rem] w-[3.5rem] bg-white px-3 py-2 bottom-[-16rem] left-[-23rem]">
            <i className="ri-add-fill text-black text-3xl"></i>
          </span>
          <p className="bottom-[-16rem] absolute left-[-16rem]">
            The most prestige capsule with the biggest terrace
            <br />
            and jacuzzi with an amazing view of Los Angeles.
          </p>
        </div>
      </div>

      <div
        ref={imageContainerRef2}
        className="absolute top-[6rem] left-1/2 -translate-x-1/2 w-[44rem] h-[20rem] rounded-[4rem] overflow-hidden z-10 pointer-events-none"
        style={{ willChange: "width, height, transform, opacity" }}
      >
        <img
          src={bg2}
          alt="capsule second"
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute top-[8rem] left-1/2 -translate-x-1/2 z-30 text-white w-[44rem] transition-opacity duration-700 ${
            revealContent
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <h1
            ref={innerTextRef2}
            className="relative ml-[-22rem] mt-[14rem] w-[48rem] text-7xl"
          >
            {"Classic Capsules®".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block opacity-0"
                style={{ transform: "translateX(-30px)" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h1 className="absolute text-6xl right-[-24rem] top-[13rem]">
            (scroll)
          </h1>
          <span className="absolute rounded-full h-[3.5rem] w-[3.5rem] bg-white px-3 py-2 bottom-[-16rem] left-[-23rem]">
            <i className="ri-add-fill text-black text-3xl"></i>
          </span>
          <p className="bottom-[-16rem] absolute left-[-16rem]">
            Classic Capsule® boasts refined aesthetics and a modern
            <br />
            interior, creating an intimate retreat in a desert landscape
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-9 text-center justify-center items-center text-white relative mt-[53rem]">
        <p className="text-3xl text-amber-700">Closer than you think</p>
        <h1 className="text-7xl">
          Our Capsules® are located <br />
          near Los Angeles with easy <br />
          access by road.
        </h1>
      </div>
    </div>
  );
};

export default MarqueeLoop;
