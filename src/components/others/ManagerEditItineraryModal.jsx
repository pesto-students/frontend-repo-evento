import Axios from "@/lib/Axios";
import { editItinerarySchema } from "@/validationSchemas";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  message,
  Input,
  TimePicker,
  Upload,
  Progress,
  DatePicker,
} from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
const { TextArea } = Input;
const { Dragger } = Upload;

const ManagerEditItineraryModal = ({
  itinerary,
  isModalOpen,
  onModalCancel,
  mode = "ADD",
}) => {
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: itinerary?.title || "",
      description: itinerary?.description || "",
    },
    validationSchema: editItinerarySchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      message.success("Data updated successfully!");
      setSubmitting(false);
    },
  });

  const thumbnailProps = {
    onRemove: (file) => {
      formik.setFieldValue("thumbnailUrl", itinerary?.thumbnailUrl);
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
      title="Update Title & Description"
      open={isModalOpen}
      onOk={formik.handleSubmit}
      onCancel={onModalCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: formik.isSubmitting,
      }}
      centered
    >
      <div className="flex flex-col gap-6 my-6">
        <div>
          <label className="text-xs text-gray-500">Title*</label>
          <Input
            id="title"
            name="title"
            placeholder="Type the event title here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="!mt-1"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-xs">{formik.errors.title}</div>
          ) : null}
        </div>
        <div>
          <label className="text-xs text-gray-500">Description*</label>
          <TextArea
            id="description"
            name="description"
            rows={4}
            placeholder="Type the event title here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="!mt-1"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-xs">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div>
          <label className="text-xs text-gray-500">Date*</label>
          <DatePicker
            id="date"
            format={"YYYY-MM-DD"}
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            onOk={() => {}}
            className="w-full !mt-1"
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="text-red-500 text-xs">{formik.errors.date}</div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Start Time*</label>
            <TimePicker
              id="startTime"
              use12Hours
              format={"YYYY-MM-DD hh:mm"}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={() => {}}
              className="w-full !mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">End Time*</label>
            <TimePicker
              id="endTime"
              use12Hours
              format={"YYYY-MM-DD hh:mm"}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={() => {}}
              className="w-full !mt-1"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500">Venue</label>
          <Input
            name="venue"
            placeholder="Type the venue here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.venue}
            className="!mt-1"
          />
          {formik.touched.venue && formik.errors.venue ? (
            <div className="text-red-500 text-xs">{formik.errors.venue}</div>
          ) : null}
        </div>
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
    </Modal>
  );
};

export default ManagerEditItineraryModal;
