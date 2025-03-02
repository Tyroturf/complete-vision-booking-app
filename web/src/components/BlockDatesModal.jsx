import React from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const BlockedDatesModal = ({
  isOpen,
  onClose,
  selectedDates,
  handleDateChange,
  handleBlockDates,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white p-4 shadow-lg rounded-md"
      >
        <h3 className="text-sm font-bold mb-2 text-center">Block Property</h3>
        <DatePicker
          selectsRange={true}
          startDate={selectedDates[0]}
          endDate={selectedDates[1]}
          onChange={handleDateChange}
          inline
          minDate={new Date()}
        />
        <div className="flex justify-between mt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleBlockDates}
            className="px-3 py-1 bg-brand text-white rounded-md text-sm"
          >
            {loading ? "Blocking..." : "Block"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlockedDatesModal;
