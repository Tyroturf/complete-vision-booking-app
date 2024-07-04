import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      className="pb-16 my-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex flex-col gap-2 px-6">
        <h1 className="text-4xl text-white font-bold uppercase">
          The perfect home base <br /> for your special trip
        </h1>
        <p className="text-2xl text-white my-6">
          Discover dreamy vacation homes all over the world
        </p>
      </div>
    </motion.div>
  );
};

export default Hero;
