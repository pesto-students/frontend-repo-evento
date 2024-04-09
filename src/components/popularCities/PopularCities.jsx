"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const cities = [
  {
    title: "Mumbai",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680372/Evento/cities/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub_quxlwl.webp",
  },
  {
    title: "Delhi",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680372/Evento/cities/New-Delhi-India-War-Memorial-arch-Sir_p2eeqn.webp",
  },
  {
    title: "Bangalore",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680373/Evento/cities/TAL-city-palace-TODOJAIPUR1023-767324cae1a9491696d6a53a96ffc085_lb9lw7.jpg",
  },
  {
    title: "Hyderabad",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680496/Evento/cities/msid-92654212_width-96_height-65_wnfgml.webp",
  },
  {
    title: "Chennai",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680372/Evento/cities/CHENNAI_e8fokv.jpg",
  },
  {
    title: "Kolkata",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680373/Evento/cities/Victoria-Memorial-Hall-Kolkata-India_sz5qhj.webp",
  },
  {
    title: "Pune",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680372/Evento/cities/Aga-Khan-Palace-Pune-India_amybg1.webp",
  },
  {
    title: "Ahmedabad",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680372/Evento/cities/1200px-Sheth_Hutheesinh_Temple_lgfoiz.jpg",
  },
];

const PopularCities = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2">
          <Building2 className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Popular Cities
          </h2>
        </div>
        <Button variant="outline">VIEW ALL</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mt-6">
        {cities.slice(0, 8).map((city, index) => (
          <div key={index} className="relative cursor-pointer">
            <Image
              width={180}
              height={100}
              src={city.image}
              alt={city.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <h3 className="font-medium text-xs text-white absolute bg-[#dc2626de] left-0 bottom-0 rounded-bl-lg rounded-tr-lg px-2">
              {city.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCities;
