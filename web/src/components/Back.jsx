import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ path, page }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="text-brand px-4 py-2 rounded-md mb-4 text-xs md:text-sm font-bold"
    >
      ← Back to {page}
    </button>
  );
};

export default Back;
