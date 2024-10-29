import React from 'react';
import {RatingStars} from '../RatingStars/RatingStars';

interface ReviewSummaryProps {
  rating: number;
  percentage: number;
}

const ReviewsSummary = ({rating, percentage}: ReviewSummaryProps) => (
  <div className="flex items-center">
    <p className="text-sm text-gray-800 font-bold">{rating}.0</p>
    <RatingStars rating={rating} />
    <div className="bg-gray-300 rounded w-full h-2 ml-3">
      <div className="w-full h-full rounded bg-orange-400" style={{width: `${percentage}%`}}></div>
    </div>
    <p className="text-sm text-gray-800 font-bold ml-3">{percentage}%</p>
  </div>
);

export default ReviewsSummary;
