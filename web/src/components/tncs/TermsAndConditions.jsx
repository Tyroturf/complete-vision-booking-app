import React from "react";

const TermsAndConditions = ({ setShowTerms, setTermsAccepted, body }) => {
  const handleAccept = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const handleDecline = () => {
    setTermsAccepted(false);
    setShowTerms(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh] relative">
        {body}

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            onClick={handleDecline}
            className="font-bold text-xs w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="font-bold text-xs w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-4xl transition"
          >
            Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
