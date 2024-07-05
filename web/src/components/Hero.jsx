import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const Hero = () => {
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
      className="pb-16 my-20 hidden md:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex flex-col gap-2 px-6">
        <h1 className="text-4xl text-white font-bold uppercase">
          The perfect home base <br /> for your special trip
        </h1>
        <div className="text-2xl text-brand my-6 font-medium flex items-center gap-2">
          <span ref={el} />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
