"use client";

import React, { useEffect, useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { Button, Card, Input, Upload, message } from "antd";
import Axios from "@/lib/Axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

const validationSchema = Yup.object().shape({
  thumbnail: Yup.string().url("Invalid URL").required("Thumbnail is required"),
  banner: Yup.string().url("Invalid URL").required("Banner is required"),
  videoUrl: Yup.string().url("Invalid URL"),
});

const BannersForm = () => {
  const { event, setEvent, setSteps } = useCreateEventContext();

  const [thumbnail, setThumbnail] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const handleThumbnailUpload = async (file, setFieldValue) => {
    setIsThumbnailUploading(true);

    const formData = new FormData();
    formData.append("thumbnail", file);

    setThumbnail({ name: file?.name, status: "uploading" });

    try {
      const res = await Axios.post("/events/upload-thumbnail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      message.success("Upload successful!");
      setThumbnail((prev) => {
        return {
          ...prev,
          status: "done",
          url: res.data.data.url,
          name: file?.name,
        };
      });
      setFieldValue("thumbnail", res.data.data.url);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
      setThumbnail((prev) => {
        return {
          ...prev,
          name: file?.name,
          status: "error",
        };
      });
    } finally {
      setIsThumbnailUploading(false);
    }
  };

  const handleBannerUpload = async (file, setFieldValue) => {
    setIsBannerUploading(true);

    const formData = new FormData();
    formData.append("banner", file);

    setBanner({ name: file?.name, status: "uploading" });

    try {
      const res = await Axios.post("/events/upload-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Upload successful!");
      setBanner((prev) => {
        return {
          ...prev,
          status: "done",
          url: res.data.data.url,
          name: file?.name,
        };
      });
      setFieldValue("banner", res.data.data.url);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
      setBanner((prev) => {
        return {
          ...prev,
          name: file?.name,
          status: "error",
        };
      });
    } finally {
      setIsBannerUploading(false);
    }
  };

  const thumbnailProps = {
    fileList: thumbnail
      ? [{ ...thumbnail, name: thumbnail?.name }]
      : event?.thumbnailUrl
        ? [
            {
              name: event?.thumbnailUrl,
              status: "done",
              url: event?.thumbnailUrl,
            },
          ]
        : [],
    onRemove: (file) => {
      console.log(file);
      setThumbnail(null);
    },
    beforeUpload: (file, fileList, event, setFieldValue) => {
      handleThumbnailUpload(file, setFieldValue);
      return false; // Prevents automatic upload by antd
    },
  };

  const bannerProps = {
    fileList: banner
      ? [{ ...banner, name: banner?.name }]
      : event?.bannerUrl
        ? [
            {
              name: event?.bannerUrl,
              status: "done",
              url: event?.bannerUrl,
            },
          ]
        : [],
    onRemove: (file) => {
      console.log(file);
      setBanner(null);
    },
    beforeUpload: (file, fileList, event, setFieldValue) => {
      handleBannerUpload(file, setFieldValue);
      return false; // Prevents automatic upload by antd
    },
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setEvent((prev) => {
      return {
        ...prev,
        thumbnailUrl: values.thumbnail,
        bannerUrl: values.banner,
        videoUrl: values.videoUrl,
      };
    });
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === 2 ? { ...step, isComplete: true } : step
      )
    );
    message.success("Data saved successfully!");
    setSubmitting(false);
  };

  return (
    <>
      <div className="text-xs">Step 2 of 5</div>
      <div className="text-lg font-semibold">Upload Image</div>
      <Card className="!mt-12">
        <Formik
          initialValues={{
            thumbnail: event?.thumbnailUrl || "",
            banner: event?.bannerUrl || "",
            videoUrl: event?.videoUrl || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-12">
                <div className="col-span-8 flex flex-col gap-1">
                  <label htmlFor="thumbnail" className=" text-xs">
                    Upload Thumbnail*
                  </label>
                  <Upload
                    {...thumbnailProps}
                    beforeUpload={(file) =>
                      thumbnailProps.beforeUpload(
                        file,
                        null,
                        null,
                        setFieldValue
                      )
                    }
                  >
                    <Button
                      loading={isThumbnailUploading}
                      disabled={isThumbnailUploading}
                      icon={<UploadCloudIcon className="w-3 h-3" />}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                  <ErrorMessage
                    name="thumbnail"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="col-span-4 flex justify-end">
                  {values.thumbnail && (
                    <Image
                      width={100}
                      height={100}
                      alt="thumbnail"
                      src={values.thumbnail}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-8 flex flex-col gap-1">
                  <label htmlFor="banner" className=" text-xs">
                    Upload Banner*
                  </label>
                  <Upload
                    {...bannerProps}
                    beforeUpload={(file) =>
                      bannerProps.beforeUpload(file, null, null, setFieldValue)
                    }
                  >
                    <Button
                      loading={isBannerUploading}
                      disabled={isBannerUploading}
                      icon={<UploadCloudIcon className="w-3 h-3" />}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                  <ErrorMessage
                    name="banner"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="col-span-4 flex justify-end">
                  {values.banner && (
                    <Image
                      width={100}
                      height={100}
                      alt="banner"
                      src={values.banner}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="videoUrl" className="text-xs">
                  Youtube Video Link
                </label>
                <Field
                  as={Input}
                  id="videoUrl"
                  name="videoUrl"
                  placeholder="https://www.youtube.com/watch?v=ABCD123XYZ"
                  className={`placeholder:text-gray-300`}
                />
                <ErrorMessage
                  name="videoUrl"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default BannersForm;
