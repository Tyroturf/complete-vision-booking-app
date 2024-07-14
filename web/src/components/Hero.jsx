import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Navbar } from "./Navbar";

const Hero = ({ imageUrl }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Find a place...",
        "Rent a car...",
        "Do both and book an experience with us.",
      ],
      typeSpeed: 50,
      backSpeed: 10,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <motion.div
      className="relative bg-cover bg-center py-6 lg:h-80 md:h-64 m-1 rounded-xl hidden md:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${imageUrl})`,
      }}
    >
      <Navbar />
      <div className="container mx-auto flex flex-col gap-2 px-6 lg:mt-16 md:mt-10">
        <h1 className="lg:text-2xl md:text-2xl text-white font-bold uppercase">
          The perfect home base <br /> for your special trip
        </h1>
        <div className="lg:text-lg md:text-xs text-[#FFBD59] lg:my-6 md:my-2 font-medium flex items-center gap-2">
          <span ref={el} />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
