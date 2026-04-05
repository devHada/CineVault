import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      style={{
        overflowX: "hidden",
        width: "100%",
        background: "var(--bg-primary)",
        minHeight: "100vh",
      }}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
