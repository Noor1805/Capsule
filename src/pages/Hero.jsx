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
    gsap.to(bgRef.current, {
      scale: 1.4,
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
      <section className="relative top-[5px] h-screen w-[98vw] overflow-hidden rounded-[4rem] left-[0.5rem] ">
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 will-change-transform rounded-lg"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center center",
          }}
        />

        <div className="relative z-10 text-amber-50 h-screen">
          <h1 className="text-[12.3rem] tracking-tight absolute top-[-2rem] mx-[1rem] font-semibold">
            Capsules<span className="text-[4rem]">®</span>
          </h1>

          <button className="flex items-center gap-1 bg-[#f6f2ea] text-black py-2 rounded-full shadow-md absolute h-13 w-[8rem] right-[2rem] top-6">
            <span className="text-sm font-medium px-5 pr-0.5">Reserve</span>
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800">
              <i className="ri-arrow-right-up-long-line text-white text-lg"></i>
            </span>
          </button>

          <h2 className="absolute bottom-9 left-5 text-lg text-[2.4rem] leading-10">
            Closer to
            <br />
            Nature—
            <br />
            Closer to Yourself
          </h2>

          <p className="absolute bottom-16 right-5 text-sm font-semibold max-w-xs text-left">
            Spend unforgettable and remarkable time <br />
            in the Californian desert with—Capsules.
          </p>

          <button className="flex items-center gap-2.5 bg-[#f6f2ea] text-black z-[999] py-2 rounded-full shadow-md fixed h-13 w-[8rem] bottom-9 left-[49%]">
            <span className="text-sm font-medium px-6 pr-2">Menu</span>
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800">
              <i className="ri-menu-fill text-white"></i>
            </span>
          </button>
        </div>
      </section>

      <div className="relative h-screen w-screen overflow-hidden">
        <h1 className="text-[4.5rem] w-[89%] left-12  top-50 absolute z-10 text-amber-50 leading-[5rem]">
          Welcome to a world of wild California desert with Capsules®, where you
          will
          <br /> discover exquisite nature observing it
          <br /> from capsule houses, nestled in the
          <br /> one of the most breathtaking
          <br /> destinations in the United States.
        </h1>

       
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[rgb(20,20,20,0.95)] z-20 pointer-events-none"
          style={{
            clipPath: "inset(0% 0% 0% 0%)", 
          }}
        />
      </div>

      <div className=" h-[25rem] mt-3  w-screen">
        <div className="img flex w-[45%] flex-row mt-[7rem] ml-7 ">
          <img
            src={img1}
            alt=""
            className="rounded-[40rem] object-cover object-center w-[40%] h-[30%] "
          />
          <img
            src={img2}
            alt=""
            className="rounded-[40rem] w-[40%] h-[30%] object-cover object-center"
          />
        </div>
        <p className="flex text-[rgb(159, 156, 156)] relative left-[50%] top-[-11rem] text-[2.5rem] leading-11  ">
          A place where you can be with
          <br /> yourself and your loved ones.
          <br /> A place where you can experience
          <br /> unforgettable desert things.
        </p>
        <p className="relative mt-[0rem] text-white ml-[2rem]">
          Discover available Capsules®
        </p>
      </div>

      <div className="relative flex flex-col h-screen w-screen mt-[2rem] overflow-hidden">
        <div
          ref={amberOverlayRef}
          className="absolute inset-0 bg-[rgb(20,20,20,0.95)] z-30 pointer-events-none"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        />
        <h1
          ref={chooseTextRef}
          className="text-[13rem]  text-amber-50 ml-[2rem] leading-[11rem] tracking-tight"
        >
          Choose the one<br />  you like best
        </h1>
        <p className="w-[40%]  text-[2.4rem] relative mt-[5rem] ml-[3rem] leading-11  ">
          You can choose one of three
          <br /> premium capsule houses in our
          <br /> offer. Each of our capsules provides
          <br /> the highest quality and meets the standards adjusted to your
          needs.
          <br /> Choose the one you like.
        </p>
        <p className=" w-[18%] text-white relative ml-[54%] mt-[-17rem]">
          All Capsules® houses—has built based on the same rules:
        </p>
        <div className="tobt relative ml-[54%] mt-[2rem] flex gap-2">
          <button className="border-2 border-gray-400 px-6 py-4 rounded-4xl text-3xl">
            Sustainable
          </button>
          <button className="border-2 border-white text-white px-6 py-4 rounded-4xl text-3xl">
            Nature—Care
          </button>
          <button className="border-2 border-gray-400 px-6 py-4 rounded-4xl text-3xl">
            Smart
          </button>
        </div>
        <div className="bottombt relative ml-[54%] mt-[1rem] flex gap-2">
          <button className="border-2 border-white text-white px-6 py-4 rounded-4xl text-3xl">
            Privacy
          </button>
          <button className="border-2 border-gray-400  px-6 py-4 rounded-4xl text-3xl">
            Spacious
          </button>
          <button className="border-2 border-white text-white px-6 py-4 rounded-4xl text-3xl">
            Glassed—In
          </button>
        </div>
      </div>

      <Capsule />
    </>
  );
}

export default Hero;
