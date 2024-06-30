"use client";

import React, { useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { Button, Card, Input, Upload, message } from "antd";
import Axios from "@/lib/Axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

const validationSchema = Yup.object().shape({
  thumbnailUrl: Yup.string()
    .url("Invalid URL")
    .required("Thumbnail is required"),
  bannerUrl: Yup.string().url("Invalid URL").required("Banner is required"),
  videoUrl: Yup.string().url("Invalid URL"),
});

const BannersForm = () => {
  const { event, setEvent, setSteps, setActiveStep } = useCreateEventContext();

  const [thumbnail, setThumbnail] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      thumbnailUrl: event?.thumbnailUrl || "",
      bannerUrl: event?.bannerUrl || "",
      videoUrl: event?.videoUrl || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setEvent((prev) => {
        return {
          ...prev,
          thumbnailUrl: values.thumbnailUrl,
          bannerUrl: values.bannerUrl,
          videoUrl: values.videoUrl,
        };
      });
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === 2 ? { ...step, isComplete: true } : step
        )
      );
      setActiveStep(3);
      setSubmitting(false);
    },
  });

  const handleThumbnailUpload = async (file) => {
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
      formik.setFieldValue("thumbnailUrl", res.data.data.url);
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

  const handleBannerUpload = async (file) => {
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
      formik.setFieldValue("bannerUrl", res.data.data.url);
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
    beforeUpload: (file) => {
      handleThumbnailUpload(file);
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
    beforeUpload: (file) => {
      handleBannerUpload(file);
      return false; // Prevents automatic upload by antd
    },
  };

  return (
    <>
      <div className="text-xs">Step 2 of 5</div>
      <div className="text-lg font-semibold">Upload Image</div>
      <Card className="!mt-12">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-12">
            <div className="col-span-8 flex flex-col gap-1">
              <label htmlFor="thumbnailUrl" className="text-xs">
                Upload Thumbnail*
              </label>
              <Upload {...thumbnailProps}>
                <Button
                  loading={isThumbnailUploading}
                  disabled={isThumbnailUploading}
                  icon={<UploadCloudIcon className="w-3 h-3" />}
                >
                  Click to Upload
                </Button>
              </Upload>
              {formik.touched.thumbnailUrl && formik.errors.thumbnailUrl && (
                <div className="text-red-500 text-xs">
                  {formik.errors.thumbnailUrl}
                </div>
              )}
            </div>
            <div className="col-span-4 flex justify-end">
              {formik.values.thumbnailUrl && (
                <Image
                  width={100}
                  height={100}
                  alt="thumbnail"
                  src={formik.values.thumbnailUrl}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-8 flex flex-col gap-1">
              <label htmlFor="bannerUrl" className="text-xs">
                Upload Banner*
              </label>
              <Upload {...bannerProps}>
                <Button
                  loading={isBannerUploading}
                  disabled={isBannerUploading}
                  icon={<UploadCloudIcon className="w-3 h-3" />}
                >
                  Click to Upload
                </Button>
              </Upload>
              {formik.touched.bannerUrl && formik.errors.bannerUrl && (
                <div className="text-red-500 text-xs">
                  {formik.errors.bannerUrl}
                </div>
              )}
            </div>
            <div className="col-span-4 flex justify-end">
              {formik.values.bannerUrl && (
                <Image
                  width={100}
                  height={100}
                  alt="banner"
                  src={formik.values.bannerUrl}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="videoUrl" className="text-xs">
              Youtube Video Link
            </label>
            <Input
              id="videoUrl"
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=ABCD123XYZ"
              className="placeholder:text-gray-300"
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.videoUrl && formik.errors.videoUrl && (
              <div className="text-red-500 text-xs">
                {formik.errors.videoUrl}
              </div>
            )}
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default BannersForm;
