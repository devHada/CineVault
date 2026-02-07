import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FadeComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="bg-black text-white">
      <button onClick={() => setShow(!show)}>Switch Content</button>

      <AnimatePresence mode="wait">
        {show ? (
          <motion.div
            key="first"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>First Content</h2>
            <p>This will fade out</p>
          </motion.div>
        ) : (
          <motion.div
            key="second"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Second Content</h2>
            <p>This will fade in</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FadeComponent;
