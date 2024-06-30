import React from "react";
import { Star } from "lucide-react";

const RatingStar = () => {
  return (
    <div class="flex items-center -ml-1">
      <Star className="w-5 h-5 text-yellow-300 " />
      <Star className="w-5 h-5 text-yellow-300 " />
      <Star className="w-5 h-5 text-yellow-300 " />
      <Star className="w-5 h-5 text-yellow-300 " />
      <Star className="w-5 h-5 text-gray-300 " />
    </div>
  );
};

export default RatingStar;
