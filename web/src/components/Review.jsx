import React from "react";

export const Review = ({ rating, reviewText, reviewerName, date }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.5 3 1.5-6.2L0 7.5l6.3-.6L10 1l2.7 5.9 6.3.6-6 4.3 1.5 6.2z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="p-8">
          <div className="flex items-center">
            <span className="text-xs font-semibold text-gray-500 mr-2">
              Rating:
            </span>
            <div className="flex">{renderStars(rating)}</div>
          </div>
          <p className="mt-2 text-gray-500 text-sm">{reviewText}</p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">{reviewerName}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RatingSummary = ({
  rating,
  score,
  numberOfReviews,
  ratingText,
}) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.5 3 1.5-6.2L0 7.5l6.3-.6L10 1l2.7 5.9 6.3.6-6 4.3 1.5 6.2z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">{renderStars(rating)}</div>
      <div className="text-xs">
        <span className="font-semibold">{score}</span> ({numberOfReviews}{" "}
        reviews)
      </div>
      <div
        className={`text-sm font-semibold ${
          rating >= 4
            ? "text-green-500"
            : rating >= 2
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {ratingText}
      </div>
    </div>
  );
};
