import React, { useState, useEffect } from "react";
import Loader from "./component/Loader";
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [HeroComponent, setHeroComponent] = useState(null);

  useEffect(() => {
    import("./pages/Hero").then((module) => {
      setHeroComponent(() => module.default);
    });

   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      {loading || !HeroComponent ? (
        <Loader />
      ) : (
        <HeroComponent />
      )}
    </div>
  );
}

export default App;

