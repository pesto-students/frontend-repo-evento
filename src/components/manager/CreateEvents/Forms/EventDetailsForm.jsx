"use client";

import React from "react";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import { Button, Card, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";

const EventDetailsForm = () => {
  const { eventCategories, event, setEvent } = useCreateEventContext();

  const formik = useFormik({
    initialValues: {
      title: event?.title || "",
      categories: event?.categories || [],
      description: event?.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      categories: Yup.array().min(1, "At least one category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      setEvent((prev) => {
        return {
          ...prev,
          ...values,
        };
      });
      message.success("Data saved successfully!");
    },
  });

  return (
    <>
      <div className="text-xs">Step 1 of 5</div>
      <div className="text-lg font-semibold">Event Details</div>
      <Card className="!mt-12">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label>Title*</label>
            <Input
              name="title"
              placeholder="Type the event title here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-xs">{formik.errors.title}</div>
            ) : null}
          </div>

          <div>
            <label>Categories*</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(value) => formik.setFieldValue("categories", value)}
              onBlur={() => formik.setFieldTouched("categories", true)}
              value={formik.values.categories}
              options={eventCategories.map((c) => {
                return {
                  label: c.title,
                  value: c.id,
                };
              })}
            />
            {formik.touched.categories && formik.errors.categories ? (
              <div className="text-red-500 text-xs">
                {formik.errors.categories}
              </div>
            ) : null}
          </div>

          <div>
            <label>Description*</label>
            <TextArea
              name="description"
              rows={8}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-xs">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default EventDetailsForm;
