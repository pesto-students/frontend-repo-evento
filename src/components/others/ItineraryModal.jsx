import { Modal } from "antd";
import { ClockIcon, MapPinnedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ItineraryModal = ({ isModalOpen, onModalCancel, data }) => {
  return (
    <Modal
      title={data?.title}
      open={isModalOpen}
      footer={[]}
      onCancel={onModalCancel}
    >
      <div>
        <Image
          width={480}
          height={360}
          src={data?.bannerUrl}
          className="w-full object-cover rounded-md mt-3"
          alt={data?.title}
        />
        <p className="mt-3 text-left">{data?.description}</p>
        <div className="flex items-center gap-6 mt-3">
          <div className=" flex items-center ">
            <ClockIcon className="w-4 h-4 text-primary" />
            <div className="text-sm ml-2 font-medium line-clamp-1">
              {data?.startTime} - {data?.endTime}
            </div>
          </div>
          <div className=" flex items-center ">
            <MapPinnedIcon className="w-4 h-4 text-primary" />
            <div className="text-sm ml-2 font-medium line-clamp-1 ">
              {data?.location}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ItineraryModal;
