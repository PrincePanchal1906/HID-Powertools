import React from "react";
import { Star } from "lucide-react";

export interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = "md",
  showNumber = false,
}) => {
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < rating;
          return (
            <Star
              key={index}
              size={iconSize}
              className={`${
                isFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-200 fill-gray-200"
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-bold text-text ml-1">{rating}</span>
      )}
    </div>
  );
};

export default StarRating;
// ✅ FILE COMPLETE
