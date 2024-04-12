"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { LocateFixed, Search } from "lucide-react";
import { useState } from "react";

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

export function LocationModal() {
  const { locationModalOpen, setLocationModalOpen } = useAppContext();
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <Dialog open={locationModalOpen} onOpenChange={setLocationModalOpen}>
      <DialogContent className="sm:max-w-[425px] lg:min-w-[900px] max-h-full overflow-auto px-0 py-6">
        <div className="mt-5 px-6">
          <div className="relative">
            <Search className="absolute top-5 left-3 text-gray-500" />
            <Input
              id="name"
              placeholder="Search for your city"
              className="col-span-3 h-14 pl-8"
            />
          </div>
          {popoverOpen && (
            <div className="absolute bg-white w-6/12 shadow-lg rounded-lg divide-y">
              {Array.from({ length: 10 }).map((item, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Mumbai
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-6">
          <Button variant="ghost" className="text-primary p-0 hover:bg-inherit">
            <LocateFixed />
            <span className="ml-1">Detect my location</span>
          </Button>
        </div>
        <div className="px-6 border-t pt-6 font-medium">Popular Cities</div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-3 px-6">
          {cities.slice(0, 8).map((city, index) => (
            <div
              key={index}
              className="cursor-pointer flex flex-col gap-2 hover:text-primary"
            >
              <Image
                width={180}
                height={100}
                src={city.image}
                alt={city.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <h3 className="font-medium text-xs text-center">{city.title}</h3>
            </div>
          ))}
        </div>
        <div className="px-6 border-t pt-6 font-medium">Other Cities</div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-3 px-6">
          <div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Bangalore
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Hyderabad
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Ahmedabad
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Chennai
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Kolkata
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Pune
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Jaipur
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Surat
            </div>
          </div>
          <div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Lucknow
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Kanpur
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Nagpur
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Patna
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Indore
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Thane
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Bhopal
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Visakhapatnam
            </div>
          </div>
          <div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Ludhiana
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Rajkot
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Agra
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Siliguri
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Noida
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Kochi
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Nashik
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Faridabad
            </div>
          </div>
          <div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Vasai-Virar
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Varanasi
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Srinagar
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Dhanbad
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Amritsar
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Allahabad
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Ranchi
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Howrah
            </div>
          </div>
          <div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Gwalior
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Vijayawada
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Jodhpur
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Madurai
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Raipur
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Kota
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Chandigarh
            </div>
            <div className="text-gray-400 cursor-pointer hover:text-primary">
              Guwahati
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
