import React from "react";
import { motion } from "framer-motion";

const LoaderDot = ({ backgroundColor, duration, delay }) => {
  return (
    <motion.div
      className={`size-5 rounded-full`}
      style={{ backgroundColor }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    />
  );
}

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-2">
      <LoaderDot backgroundColor={"#ea4335"} duration={1} delay={0} />
      <LoaderDot backgroundColor={"#4285f4"} duration={1} delay={0.2} />
      <LoaderDot backgroundColor={"#f4b400"} duration={1} delay={0.4} />
      <LoaderDot backgroundColor={"#0f9d58"} duration={1} delay={0.6} />
    </div>
  );
}

export default Loader;