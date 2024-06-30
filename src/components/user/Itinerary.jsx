import { ChevronRight, Clock, ListChecks, MapPinned } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const agenda = [
  {
    title: "Opening ceremony",
    images: [],
    startTime: "3PM",
    endTime: "4PM",
    location: "Main Stage",
  },
  {
    title: "B Praak live concert",
    images: [],
    startTime: "4:30PM",
    endTime: "7PM",
    location: "Main Stage",
  },
];

const Itinerary = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex gap-2 items-center">
        <ListChecks className="text-primary" />
        <h2 className="text-lg font-semibold text-content uppercase">
          Itinerary
        </h2>
      </div>

      <div className="inline-flex rounded-md shadow-sm mt-6" role="group">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-content bg-white border rounded-s-lg"
        >
          Mon, 23 June
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-content bg-white border-t border-b"
        >
          Tue, 24 June
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-content bg-white border rounded-e-lg"
        >
          Wed, 25 June
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {agenda.map((item, i) => (
          <Dialog key={i}>
            <DialogTrigger>
              <div className="p-6 border shadow-sm rounded-lg flex bg-white cursor-pointer">
                <div className="flex-1">
                  <h4 className="text-content text-lg font-semibold text-left mb-2">
                    {item.title}
                  </h4>
                  <div className="mb-4 flex gap-3 items-center">
                    <Image
                      src="https://res.cloudinary.com/dv68nyejy/image/upload/v1712380759/Evento/thumbnail/b_praak2_opndqq.webp"
                      alt=""
                      width={100}
                      height={100}
                      className="w-14 h-14 rounded"
                    />
                    <p className="text-left line-clamp-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quasi recusandae exercitationem laborum nam, quidem enim
                      animi eum ab, expedita voluptates neque. Voluptatum a
                      saepe dolorem ut libero sit atque?
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 text-sm">
                    <div className="flex gap-1 items-center">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {item.startTime} - {item.endTime}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <MapPinned className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <ChevronRight className="opacity-60" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-content">{item.title}</DialogTitle>
                <DialogDescription>
                  <Image
                    width={480}
                    height={360}
                    src="https://res.cloudinary.com/dv68nyejy/image/upload/v1712680962/Evento/banners/iqwn93dgvkpc8vp8bvml_pv9avu.webp"
                    className="w-full object-cover rounded-md mt-4"
                    alt="Event Spotlight"
                  />
                  <p className="mt-4 text-left">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </p>
                  <div className="mt-4 flex items-center ">
                    <Clock className="w-4 h-4 text-primary" />
                    <div className="text-sm ml-2 font-medium line-clamp-1">
                      {item.startTime} - {item.endTime}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center ">
                    <MapPinned className="w-4 h-4 text-primary" />
                    <div className="text-sm ml-2 font-medium line-clamp-1 ">
                      {item.location}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};

export default Itinerary;
