import { Modal } from "antd";
import Image from "next/image";
import React from "react";

const MapMarkerModal = ({ isModalOpen, onModalCancel, data }) => {
  return (
    <Modal
      title={data?.title}
      open={isModalOpen}
      footer={[]}
      onCancel={onModalCancel}
    >
      <div>
        {data?.image && (
          <Image
            width={480}
            height={360}
            src={data?.image}
            className="w-full object-cover rounded-md mt-3"
            alt={data?.title}
          />
        )}

        <p className="mt-3 text-left">{data?.description}</p>
      </div>
    </Modal>
  );
};

export default MapMarkerModal;
