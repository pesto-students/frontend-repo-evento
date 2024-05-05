"use client";
import {
  Button,
  Card,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { SaveIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import FormButtons from "../FormButtons";

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const EditEventDetails = () => {
  const [thumbnail, setThumbnail] = useState(
    "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png"
  );
  const [banner, setBanner] = useState(
    "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1702288015%2Fdhlkrsbpopg5cfpnz23n.jpg"
  );
  const [loading, setLoading] = useState(false);
  const options = [];
  return (
    <form>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <FormButtons />
        </div>
        <div className="col-span-3">
          <Card title="Event Images" className="w-full h-full">
            <div>
              <label>Thumbnail (400 * 400)</label>
              <div className="mt-2">
                <Image
                  src={thumbnail}
                  alt="avatar"
                  width={400}
                  height={400}
                  className="w-full rounded-md mb-2"
                />
                <Upload {...props}>
                  <Button icon={<UploadIcon className="w-3 h-3" />}>
                    Click to Replace
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="mt-6">
              <label>Banner (1200 * 800)</label>
              <div className="mt-2">
                <Image
                  src={banner}
                  alt="avatar"
                  width={400}
                  height={400}
                  className="w-full rounded-md mb-2"
                />
                <Upload {...props}>
                  <Button icon={<UploadIcon className="w-3 h-3" />}>
                    Click to Replace
                  </Button>
                </Upload>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-9">
          <Card
            title="General Information"
            extra={
              <Button type="primary" icon={<SaveIcon className="w-3 h-3" />}>
                Update
              </Button>
            }
            className="w-full h-full"
          >
            <div className="mb-6">
              <div className="mb-1">
                <label htmlFor="title">Event Title</label>
              </div>
              <Input id="title" placeholder="Basic usage" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <div className="mb-1">
                  <label htmlFor="startDate">Start Date</label>
                </div>
                <DatePicker
                  id="startDate"
                  showTime
                  use12Hours
                  format={"YYYY-MM-DD hh:mm"}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={() => {}}
                  className="w-full"
                />
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="endDate">End Date</label>
                </div>
                <DatePicker
                  id="endDate"
                  showTime
                  use12Hours
                  format={"YYYY-MM-DD hh:mm"}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={() => {}}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <div className="mb-1">
                  <label htmlFor="startDate">Venue</label>
                </div>
                <Input id="venue" placeholder="Basic usage" />
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="startDate">Entry Fee</label>
                </div>
                <InputNumber
                  id="entryFee"
                  placeholder="Basic usage"
                  className="!w-full"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-1">
                <label htmlFor="startDate">Categories</label>
              </div>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={["a10", "c12"]}
                onChange={() => {}}
                options={options}
              />
            </div>
            <div className="">
              <div className="mb-1">
                <label htmlFor="startDate">Description</label>
              </div>
              <TextArea rows={6} placeholder="maxLength is 6" maxLength={6} />
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default EditEventDetails;
