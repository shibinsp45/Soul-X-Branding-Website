import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    rotateX: 2,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    rotateX: -2,
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
