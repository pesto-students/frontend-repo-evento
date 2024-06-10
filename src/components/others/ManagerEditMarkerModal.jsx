import Axios from "@/lib/Axios";
import { editMarkerSchema } from "@/validationSchemas";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  Button,
  InputNumber,
  Modal,
  Progress,
  Select,
  Upload,
  message,
} from "antd";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useState } from "react";
const { Dragger } = Upload;

const ManagerEditMarkerModal = ({
  data,
  isModalOpen,
  onModalCancel,
  mode = "ADD",
}) => {
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
      type: data?.type || "",
      number: data?.number || 1,
      thumbnailUrl: data?.thumbnailUrl || "",
    },
    validationSchema: editMarkerSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      message.success("Data updated successfully!");
      setSubmitting(false);
    },
  });

  const thumbnailProps = {
    onRemove: (file) => {
      formik.setFieldValue("thumbnailUrl", data?.thumbnailUrl);
    },
    beforeUpload: (file) => {
      handleThumbnailUpload(file);
      return false; // Prevents automatic upload by antd
    },
    maxCount: 1,
    listType: "picture",
    onProgress: ({ percent }) => setThumbnailUploadProgress(percent),
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
      formik.setFieldValue("thumbnailUrl", res.data.data.url);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  return (
    <Modal
      title={mode === "ADD" ? "Add New Marker" : "Edit Marker"}
      open={isModalOpen}
      footer={[
        <Button key="back" onClick={onModalCancel}>
          Cancel
        </Button>,
        <Button key="link" type="primary" loading={false} onClick={undefined}>
          Delete
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Save
        </Button>,
      ]}
      onCancel={onModalCancel}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3 mt-6">
          <Input
            placeholder="Title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>
        <div className="mb-3">
          <TextArea
            placeholder="Description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <Select
              id="type"
              onChange={(value) => formik.setFieldValue("type", value)}
              placeholder="Select Type"
              options={[
                { value: "amenity", label: "Amenity" },
                { value: "shop", label: "Store" },
              ]}
              className="!w-full"
              value={formik.values.type}
            />
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.type}
              </div>
            )}
          </div>
          <div>
            <InputNumber
              min={1}
              max={10}
              placeholder="Number"
              name="number"
              onChange={(value) => formik.setFieldValue("number", value)}
              onBlur={formik.handleBlur}
              value={formik.values.number}
              className="!w-full"
            />
            {formik.touched.number && formik.errors.number && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.number}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <div>
            <Dragger {...thumbnailProps}>
              <div className="flex justify-center">
                <PhotoIcon className="w-8 text-gray-500" />
              </div>
              <div className="mt-2">Upload Thumbnail</div>
              <div className="text-xs mt-1 text-gray-500">
                Click or drag file to this area to upload
              </div>
            </Dragger>
            {formik.touched.thumbnailUrl && formik.errors.thumbnailUrl && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.thumbnailUrl}
              </div>
            )}
            {isUploadingThumbnail && (
              <div>
                <Progress size="small" percent={thumbnailUploadProgress} />
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManagerEditMarkerModal;
