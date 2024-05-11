import { Segmented } from "antd";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { ChevronRight, Clock, MapPinned } from "lucide-react";

const Itinerary = () => {
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
  return (
    <>
      <Segmented
        options={[
          "Mon, 23 June",
          "Mon, 24 June",
          "Mon, 25 June",
          "Mon, 26 June",
          "Mon, 27 June",
        ]}
        onChange={(value) => {
          console.log(value); // string
        }}
      />
      <div className="mt-6 grid grid-cols-2 gap-6">
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
    </>
  );
};

export default Itinerary;
