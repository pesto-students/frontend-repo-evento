"use client";

import React, { useState } from "react";
import FormButtons from "../FormButtons";
import { Button, Card, Input, Segmented, Tabs, TimePicker, Upload } from "antd";
import {
  ClockIcon,
  LoaderCircleIcon,
  MapPinnedIcon,
  PlusIcon,
  SaveIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";

const fileList = [
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const EditItinerary = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png"
  );
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? (
        <LoaderCircleIcon className="animate-pulse" />
      ) : (
        <PlusIcon className="" />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <form>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <FormButtons />
        </div>
        <div className="col-span-12">
          <Segmented
            options={[
              "Mon, 23 June",
              "Mon, 24 June",
              "Mon, 25 June",
              "Mon, 26 June",
              "Mon, 27 June",
            ]}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="col-span-6">
          <Card
            title="Itineraries"
            extra={
              <Button type="primary" icon={<PlusIcon className="w-3 h-3" />} />
            }
            className="w-full h-full"
          >
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((item) => (
                <div
                  key={item}
                  className="py-2 px-3 bg-gray-50 rounded-md cursor-pointer"
                >
                  <div className="flex">
                    <div className="font-medium flex-1">
                      {" "}
                      1. Opening ceremony
                    </div>
                    <XIcon className="w-3" />
                  </div>
                  <div className="text-xs flex">
                    <div className="flex gap-1 items-center w-32">
                      <ClockIcon className="w-3" />
                      <span> 3.15PM - 4.30PM</span>
                    </div>
                    <div className="flex gap-1 items-center ml-6">
                      <MapPinnedIcon className="w-3" />
                      <span> Main Stage</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="col-span-6">
          <Card
            title="Update Itinerary"
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
            <div className="mb-6">
              <div className="mb-1">
                <label htmlFor="startDate">Description</label>
              </div>
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <div className="mb-1">
                  <label htmlFor="startTime">Start Time</label>
                </div>
                <TimePicker
                  id="startTime"
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
                  <label htmlFor="endTime">End Time</label>
                </div>
                <TimePicker
                  id="endTime"
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
            <div className="mb-6">
              <div className="mb-1">
                <label htmlFor="title">Venue</label>
              </div>
              <Input id="title" placeholder="Basic usage" />
            </div>
            <div className="mb-6">
              <div className="mb-1">
                <label htmlFor="title">Image</label>
              </div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt="avatar" width={100} height={100} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default EditItinerary;
