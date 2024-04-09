import React from "react";
import { HiStar } from "react-icons/hi";

const RatingStar = () => {
  return (
    <div class="flex items-center -ml-1">
      <HiStar className="w-5 h-5 text-yellow-300 " />
      <HiStar className="w-5 h-5 text-yellow-300 " />
      <HiStar className="w-5 h-5 text-yellow-300 " />
      <HiStar className="w-5 h-5 text-yellow-300 " />
      <HiStar className="w-5 h-5 text-gray-300 " />
    </div>
  );
};

export default RatingStar;
