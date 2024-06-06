import Axios from "@/lib/Axios";
import { Modal, Upload, message, Input, Progress } from "antd";
import { useFormik } from "formik";
import { ImageIcon } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
const { Dragger } = Upload;

const validationSchema = Yup.object().shape({
  thumbnailUrl: Yup.string().url("Invalid URL"),
  bannerUrl: Yup.string().url("Invalid URL"),
  videoUrl: Yup.string().url("Invalid URL"),
});

const ManagerEditImageModal = ({ event, isModalOpen, onModalCancel }) => {
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  const formik = useFormik({
    initialValues: {
      thumbnailUrl: event?.thumbnailUrl || "",
      bannerUrl: event?.bannerUrl || "",
      videoUrl: event?.videoUrl || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { setFieldValue, values, handleChange, handleSubmit, errors, touched } =
    formik;

  const thumbnailProps = {
    onRemove: (file) => {
      setFieldValue("thumbnailUrl", event?.thumbnailUrl);
    },
    beforeUpload: (file) => {
      handleThumbnailUpload(file);
      return false; // Prevents automatic upload by antd
    },
    maxCount: 1,
    listType: "picture",
    onProgress: ({ percent }) => setThumbnailUploadProgress(percent),
  };

  const bannerProps = {
    onRemove: (file) => {
      setFieldValue("bannerUrl", event?.bannerUrl);
    },
    beforeUpload: (file) => {
      handleBannerUpload(file);
      return false; // Prevents automatic upload by antd
    },
    maxCount: 1,
    listType: "picture",
    onProgress: ({ percent }) => setBannerUploadProgress(percent),
  };

  const handleThumbnailUpload = async (file) => {
    setIsUploadingThumbnail(true);
    setThumbnailUploadProgress(0);

    const formData = new FormData();
    formData.append("thumbnail", file);

    try {
      const res = await Axios.post("/events/upload-thumbnail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setThumbnailUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      message.success("Upload successful!");
      setFieldValue("thumbnailUrl", res.data.data.url);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleBannerUpload = async (file) => {
    setIsUploadingBanner(true);
    setBannerUploadProgress(0);

    const formData = new FormData();
    formData.append("banner", file);

    try {
      const res = await Axios.post("/events/upload-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setBannerUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      message.success("Upload successful!");
      setFieldValue("bannerUrl", res.data.data.url);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setIsUploadingBanner(false);
    }
  };

  return (
    <Modal
      title="Update Banner & Thumbnail"
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={onModalCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        disabled: isUploadingThumbnail || isUploadingBanner,
      }}
    >
      <div className="flex flex-col gap-6 my-6">
        <div>
          <Dragger {...thumbnailProps}>
            <div className="flex justify-center">
              <ImageIcon />
            </div>
            <div className="mt-2">Upload Thumbnail</div>
            <div className="text-xs mt-2 text-gray-500">
              Click or drag file to this area to upload
            </div>
          </Dragger>
          {touched.thumbnailUrl && errors.thumbnailUrl && (
            <div className="text-red-500 text-xs mt-1">
              {errors.thumbnailUrl}
            </div>
          )}
          {isUploadingThumbnail && (
            <div>
              <Progress size="small" percent={thumbnailUploadProgress} />
            </div>
          )}
        </div>
        <div>
          <Dragger {...bannerProps}>
            <div className="flex justify-center">
              <ImageIcon />
            </div>
            <div className="mt-2">Upload Banner</div>
            <div className="text-xs mt-2 text-gray-500">
              Click or drag file to this area to upload
            </div>
          </Dragger>
          {touched.bannerUrl && errors.bannerUrl && (
            <div className="text-red-500 text-xs mt-1">{errors.bannerUrl}</div>
          )}
          {isUploadingBanner && (
            <div>
              <Progress size="small" percent={bannerUploadProgress} />
            </div>
          )}
        </div>
        <div>
          <Input
            id="videoUrl"
            name="videoUrl"
            value={values.videoUrl}
            onChange={handleChange}
            placeholder="Youtube Video Link"
            className="placeholder:text-gray-300 placeholder:text-xs mt-2"
          />
          {touched.videoUrl && errors.videoUrl && (
            <div className="text-red-500 text-xs mt-1">{errors.videoUrl}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ManagerEditImageModal;
