import { Button, Card, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Clock, HeartIcon, MapPinned } from "lucide-react";
import ItineraryModal from "../others/ItineraryModal";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ManagerEditItineraryModal from "../others/ManagerEditItineraryModal";

const Itinerary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const [isManagerEditItineraryModalOpen, setIsManagerEditItineraryModalOpen] =
    useState(false);
  const [managerEditItineraryModalMode, setManagerEditItineraryModalMode] =
    useState("ADD");

  const itinerary = [
    {
      title: "Opening ceremony",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rerum, odio dolores nobis quis non alias quidem, repellat quod eveniet blanditiis harum nam iure! Quia odit officiis illum ut quae?",
      startTime: "3PM",
      endTime: "4PM",
      location: "Main Stage",
      bannerUrl:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1714053402/Evento/banners/wcoowm5ikue2lvevxxmn_cc8hpk.webp",
    },
    {
      title: "B Praak live concert",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rerum, odio dolores nobis quis non alias quidem, repellat quod eveniet blanditiis harum nam iure! Quia odit officiis illum ut quae?",
      startTime: "4:30PM",
      endTime: "7PM",
      location: "Main Stage",
      bannerUrl:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712680963/Evento/banners/mc6dexmf8biost4q27h6_qfxsmv.webp",
    },
  ];

  const handleCardClick = (index) => {
    setModalData(itinerary[index]);
  };

  useEffect(() => {
    if (modalData) setIsModalOpen(true);
    console.log(modalData);
  }, [modalData]);

  useEffect(() => {
    if (editModalData) setIsManagerEditItineraryModalOpen(true);
  }, [editModalData]);

  return (
    <>
      <div className="flex justify-between gap-6">
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setManagerEditItineraryModalMode("ADD");
            setIsManagerEditItineraryModalOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        {itinerary.map((item, i) => (
          <Card
            key={i}
            onClick={() => handleCardClick(i)}
            className="cursor-pointer"
          >
            <div className="flex gap-6">
              <div className="flex-1">
                <h4 className="text-content text-lg font-semibold text-left mb-2">
                  {item.title}
                </h4>
              </div>
              <div className="flex gap-2 justify-between">
                <Button
                  shape="circle"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setManagerEditItineraryModalMode("EDIT");
                    setEditModalData(item);
                  }}
                />
                <Button
                  shape="circle"
                  size="small"
                  icon={<XMarkIcon className="w-3.5" />}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-3 items-center">
              <Image
                src={item.bannerUrl}
                alt={item.title}
                width={100}
                height={100}
                className="w-14 h-14 rounded object-cover"
              />
              <p className="text-left line-clamp-3">{item.description}</p>
            </div>
            <div className="flex justify-between">
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
              <div className="flex justify-end">
                <ChevronRight className="opacity-60 w-4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ItineraryModal
        isModalOpen={isModalOpen}
        onModalCancel={() => setIsModalOpen(false)}
        data={modalData}
      />
      <ManagerEditItineraryModal
        isModalOpen={isManagerEditItineraryModalOpen}
        onModalCancel={() => setIsManagerEditItineraryModalOpen(false)}
        itinerary={editModalData}
        mode={managerEditItineraryModalMode}
      />
    </>
  );
};

export default Itinerary;
