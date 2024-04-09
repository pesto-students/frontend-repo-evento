"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const cities = [
  {
    title: "Mumbai",
    image:
      "https://i0.wp.com/www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg?fit=900%2C506&ssl=1",
  },
  {
    title: "Delhi",
    image:
      "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
  },
  {
    title: "Bangalore",
    image:
      "https://www.thehosteller.com/_next/image?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2FCover%20(1).jpg%2FCover%20(1)-1690261803767.jpg&w=2048&q=75",
  },
  {
    title: "Hyderabad",
    image:
      "https://static.toiimg.com/photo/msid-92654212,width-96,height-65.cms",
  },
  {
    title: "Chennai",
    image: "https://www.holidify.com/images/bgImages/CHENNAI%20.jpg",
  },
  {
    title: "Kolkata",
    image:
      "https://cdn.britannica.com/91/110191-050-7BCFD56B/Victoria-Memorial-Hall-Kolkata-India.jpg",
  },
  {
    title: "Pune",
    image:
      "https://cdn.britannica.com/69/146869-050-676DD6B7/Aga-Khan-Palace-Pune-India.jpg",
  },
  {
    title: "Ahmedabad",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sheth_Hutheesinh_Temple.jpg/1200px-Sheth_Hutheesinh_Temple.jpg",
  },
  {
    title: "Jaipur",
    image:
      "https://www.travelandleisure.com/thmb/P67PtX_g34q6mojlfa5405HdLuw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-city-palace-TODOJAIPUR1023-767324cae1a9491696d6a53a96ffc085.jpg",
  },
  {
    title: "Lucknow",
    image: "https://lp-cms-production.imgix.net/2022-03/500pxRF_26117913.jpg",
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
