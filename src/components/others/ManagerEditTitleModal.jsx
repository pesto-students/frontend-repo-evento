import Axios from "@/lib/Axios";
import { Modal, message, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
const { TextArea } = Input;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
});

const ManagerEditTitleModal = ({ event, isModalOpen, onModalCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: event?.title || "",
      description: event?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    setFieldValue,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = formik;

  return (
    <Modal
      title="Update Title & Description"
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={onModalCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isLoading,
      }}
      className="!w-8/12"
    >
      <div className="flex flex-col gap-6 my-6">
        <div>
          <label className="text-xs text-gray-500">Title*</label>
          <Input
            name="title"
            placeholder="Type the event title here..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            className="!mt-1"
          />
          {touched.title && errors.title ? (
            <div className="text-red-500 text-xs">{errors.title}</div>
          ) : null}
        </div>
        <div>
          <label className="text-xs text-gray-500">Description*</label>
          <TextArea
            name="description"
            rows={16}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className="!mt-1"
          />
          {touched.description && errors.description ? (
            <div className="text-red-500 text-xs">{errors.description}</div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ManagerEditTitleModal;
