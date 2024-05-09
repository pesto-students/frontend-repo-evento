import { Button, InputNumber, Modal, Select, Upload } from "antd";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadIcon } from "lucide-react";
import React from "react";

const MapMarkerModal = ({ isModalOpen, handleModalCancel }) => {
  return (
    <Modal
      title="Add Marker"
      open={isModalOpen}
      footer={[
        <Button key="back" onClick={handleModalCancel}>
          Cancel
        </Button>,
        <Button key="link" type="primary" loading={false} onClick={undefined}>
          Delete
        </Button>,
        <Button key="link" type="primary" loading={false} onClick={undefined}>
          Save
        </Button>,
      ]}
      onCancel={handleModalCancel}
    >
      <div className="mb-3 mt-6">
        <Input placeholder="title" />
      </div>
      <div className="mb-3">
        <TextArea placeholder="description" />
      </div>
      <div className="mb-3 flex gap-3">
        <Select
          onChange={undefined}
          placeholder="type"
          options={[
            {
              value: "amenity",
              label: "Amenity",
            },
            {
              value: "shop",
              label: "Store",
            },
          ]}
          className="flex-1"
        />
        <InputNumber
          min={1}
          max={10}
          placeholder="number"
          onChange={undefined}
          className="flex-1"
        />
      </div>
      <div className="mb-3">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          defaultFileList={[]}
        >
          <Button icon={<UploadIcon className="w-3 h-3" />}>
            Upload Image
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default MapMarkerModal;
