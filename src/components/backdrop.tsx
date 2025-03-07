import React, { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface BackdropProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="jeopardy-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;