import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, className = '' }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div className={`flex items-center gap-1 text-yellow-400 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => (
        index < safeRating ? <FaStar key={index} /> : <FaRegStar key={index} />
      ))}
      <span className="text-gray-400 text-[12px] ml-1">({safeRating})</span>
    </div>
  );
};

export default RatingStars;
