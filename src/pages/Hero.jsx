import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../assets/cap1.avif";
import img1 from "../assets/img1.avif";
import img2 from "../assets/img2.avif";
import Capsule from "./CapsuleAnimation";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const chooseTextRef = useRef(null);
  const amberOverlayRef = useRef(null);

  useEffect(() => {
    gsap.from(amberOverlayRef.current, {
      transform: `rotateX(100deg)`,
      opacity: 0,
      duration: 2.5,
      stagger: 1,
      scrollTrigger: {
        trigger: amberOverlayRef.current,
        start: "top 40%",
        end: "bottom 270%",
        ease: "power2.out",
        scrub: true,
      },
    });

    const el = chooseTextRef.current;
    if (!el) return;

    const originalText = el.innerText;
    el.innerText = "";

    const letters = originalText.split("");

    const spanElements = letters.map((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.position = "relative";
      wrapper.style.overflow = "hidden";
      wrapper.style.marginRight = "2px";

      const letterSpan = document.createElement("span");
      letterSpan.innerText = char === " " ? "\u00A0" : char;
      letterSpan.style.display = "inline-block";
      letterSpan.style.position = "relative";
      letterSpan.style.zIndex = "1";
      wrapper.appendChild(letterSpan);

      const mask = document.createElement("span");
      mask.style.position = "absolute";
      mask.style.top = "0";
      mask.style.left = "0";
      mask.style.width = "100%";
      mask.style.height = "100%";
      mask.style.backgroundColor = "rgb(20, 20, 20)";
      mask.style.zIndex = "2";
      wrapper.appendChild(mask);

      el.appendChild(wrapper);
      return { letterSpan, mask };
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(
      spanElements.map((item) => item.mask),
      {
        xPercent: -100,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
      },
      0
    ).fromTo(
      spanElements.map((item) => item.letterSpan),
      { xPercent: 20 },
      {
        xPercent: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05,
      },
      0
    );
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    gsap.to(bgRef.current, {
      scale: isMobile ? 1.15 : 1.4,
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    gsap.to(overlayRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <section className="relative top-[5px] h-[65vh] sm:h-screen w-full px-2 sm:px-4 overflow-hidden rounded-[2rem] sm:rounded-[4rem]">
        <img
          ref={bgRef}
          src={bg}
          alt="Hero background"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center will-change-transform rounded-[2rem] sm:rounded-[4rem]"
          style={{
            transformOrigin: "center center",
          }}
        />

        <div className="relative z-10 text-amber-50 h-full flex flex-col justify-between p-6 sm:p-10">
          <h1 className="text-[18vw] sm:text-[12.3rem] tracking-tight leading-none font-semibold mt-4 sm:mt-0">
            Capsules<span className="text-[0.4em]">®</span>
          </h1>

          <button className="flex items-center gap-1 bg-[#f6f2ea] text-black py-2 rounded-full shadow-md absolute h-11 sm:h-13 w-[7rem] sm:w-[8rem] right-6 sm:right-[2rem] top-6 sm:top-6">
            <span className="text-xs sm:text-sm font-medium px-4 sm:px-5 pr-0.5">
              Reserve
            </span>
            <span className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gray-800">
              <i className="ri-arrow-right-up-long-line text-white text-base sm:text-lg"></i>
            </span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full mb-16 sm:mb-9 lg:mb-12">
            <h2 className="text-[7vw] sm:text-[2.4rem] leading-tight sm:leading-10 mb-6 sm:mb-0">
              Closer to
              <br />
              Nature—
              <br />
              Closer to Yourself
            </h2>

            <p className="text-xs sm:text-sm font-semibold max-w-[15rem] sm:max-w-xs text-left mb-12 sm:mb-0">
              Spend unforgettable and remarkable time{" "}
              <br className="hidden sm:block" />
              in the Californian desert with—Capsules.
            </p>
          </div>

          <button className="flex items-center gap-2.5 bg-[#f6f2ea] text-black z-[999] py-2 rounded-full shadow-md fixed h-11 sm:h-13 w-[7rem] sm:w-[8rem] bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2">
            <span className="text-xs sm:text-sm font-medium px-5 sm:px-6 pr-2">
              Menu
            </span>
            <span className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gray-800">
              <i className="ri-menu-fill text-white"></i>
            </span>
          </button>
        </div>
      </section>

      <div className="relative h-screen w-full overflow-hidden px-6 sm:px-12 flex items-center">
        <h1 className="text-[8vw] sm:text-[4.5rem] w-full sm:w-[89%] relative z-10 text-amber-50 leading-[1.1] sm:leading-[5rem]">
          Welcome to a world of wild California desert with Capsules®, where you
          will discover exquisite nature observing it from capsule houses,
          nestled in the one of the most breathtaking destinations in the United
          States.
        </h1>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[rgb(20,20,20,0.95)] z-20 pointer-events-none"
          style={{
            clipPath: "inset(0% 0% 0% 0%)",
          }}
        />
      </div>

      <div className="min-h-[25rem] mt-3 w-full px-6 sm:px-12 flex flex-col md:flex-row items-center md:items-start gap-12 sm:gap-20">
        <div className="img flex w-full md:w-[50%] flex-row gap-4">
          <img
            src={img1}
            alt=""
            className="rounded-3xl sm:rounded-full object-cover object-center w-1/2 aspect-square sm:aspect-[4/5]"
          />
          <img
            src={img2}
            alt=""
            className="rounded-3xl sm:rounded-full w-1/2 aspect-square sm:aspect-[4/5] object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-6 md:mt-12">
          <p className="text-[rgb(159,156,156)] text-[5vw] sm:text-[2.5rem] leading-tight sm:leading-11">
            A place where you can be with
            <br /> yourself and your loved ones.
            <br /> A place where you can experience
            <br /> unforgettable desert things.
          </p>
          <p className="text-white">Discover available Capsules®</p>
        </div>
      </div>

      <div className="relative flex flex-col min-h-screen w-full mt-[2rem] overflow-hidden px-6 sm:px-12">
        <div
          ref={amberOverlayRef}
          className="absolute inset-0 bg-[rgb(20,20,20,0.95)] z-30 pointer-events-none"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        />
        <h1
          ref={chooseTextRef}
          className="text-[15vw] sm:text-[13rem] text-amber-50 leading-[0.9] tracking-tight mb-12 sm:mb-20"
        >
          Choose the one
          <br /> you like best
        </h1>

        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <p className="w-full lg:w-[45%] text-[5vw] sm:text-[2.4rem] leading-tight sm:leading-11">
            You can choose one of three
            <br className="hidden sm:block" /> premium capsule houses in our
            <br className="hidden sm:block" /> offer. Each of our capsules
            provides
            <br className="hidden sm:block" /> the highest quality and meets the
            standards adjusted to your needs.
            <br className="hidden sm:block" /> Choose the one you like.
          </p>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <p className="text-white text-lg">
              All Capsules® houses—has built based on the same rules:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="border-2 border-gray-400 px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Sustainable
              </button>
              <button className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Nature—Care
              </button>
              <button className="border-2 border-gray-400 px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Smart
              </button>
              <button className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Privacy
              </button>
              <button className="border-2 border-gray-400 px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Spacious
              </button>
              <button className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-4 rounded-full text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors">
                Glassed—In
              </button>
            </div>
          </div>
        </div>
      </div>

      <Capsule />
    </>
  );
}

export default Hero;
