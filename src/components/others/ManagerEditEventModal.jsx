import Axios from "@/lib/Axios";
import { editEventSchema } from "@/validationSchemas";
import { Modal, message, Input, Select } from "antd";
import { useFormik } from "formik";
import React from "react";
const { TextArea } = Input;

const ManagerEditEventModal = ({
  event,
  allCategories,
  isModalOpen,
  onModalCancel,
}) => {
  const categoryOptions = allCategories.map((item) => ({
    value: item.id,
    label: item.title,
  }));
  const formik = useFormik({
    initialValues: {
      title: event?.title,
      description: event?.description,
      categories: event?.categories,
    },
    validationSchema: editEventSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      message.success("Data updated successfully!");
      setSubmitting(false);
    },
  });

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
      className="!w-8/12"
      centered
    >
      <div className="flex flex-col gap-6 my-6">
        <div>
          <label className="text-xs text-gray-500">Title*</label>
          <Input
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
          <label className="text-xs text-gray-500">Categories*</label>
          <Select
            id="categories"
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            value={formik.values.categories}
            onChange={(value) => formik.setFieldValue("categories", value)}
            options={categoryOptions}
            className="!mt-1"
          />
          {formik.touched.categories && formik.errors.categories ? (
            <div className="text-red-500 text-xs">
              {formik.errors.categories}
            </div>
          ) : null}
        </div>
        <div>
          <label className="text-xs text-gray-500">Description*</label>
          <TextArea
            name="description"
            rows={16}
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
      </div>
    </Modal>
  );
};

export default ManagerEditEventModal;
