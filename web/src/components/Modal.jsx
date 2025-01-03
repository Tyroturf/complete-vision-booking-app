import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const Modal = ({ isOpen, onClose, children }) => {
  const overlayRef = useRef();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="mt-20 bg-white w-full max-w-md sm:max-w-sm p-4 sm:p-6 md:p-8 rounded-lg shadow-lg relative max-h-[90vh] overflow-hidden m-5"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <button
              className="absolute top-3 right-3 md:top-7 md:right-7 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="mt-8 max-h-[75vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
