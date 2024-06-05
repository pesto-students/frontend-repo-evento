"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, message, Card } from "antd";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

const validationSchema = Yup.object({
  organizerName: Yup.string().required("Organizer Name is required"),
  organizerEmail: Yup.string()
    .email("Invalid email address")
    .required("Organizer Email is required"),
  organizerPhone: Yup.string().required("Organizer Contact is required"),
});

const EmergencyInfoForm = () => {
  const { setEvent, event, setSteps } = useCreateEventContext();

  // This is a temp fix for the react select package
  const [isMounted, setIsMounted] = useState(false);

  const formik = useFormik({
    initialValues: {
      organizerName: event?.organizerName || "",
      organizerEmail: event?.organizerEmail || "",
      organizerPhone: event?.organizerPhone || "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setEvent((prev) => {
        return {
          ...prev,
          ...values,
        };
      });
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === 4 ? { ...step, isComplete: true } : step
        )
      );
      message.success("Data saved successfully!");
      setSubmitting(false);
    },
  });

  // This is a temp fix for the react select package
  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted && (
        <>
          <div className="text-xs">Step 4 of 5</div>
          <div className="text-lg font-semibold">Host Information</div>
          <Card className="!mt-12">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              <div>
                <label className="text-xs">Organizer Name*</label>
                <Input
                  name="organizerName"
                  placeholder="Who is organizing the event?"
                  value={formik.values.organizerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.organizerName &&
                  formik.errors.organizerName && (
                    <span className="text-red-500 text-xs">
                      {formik.errors.organizerName}
                    </span>
                  )}
              </div>
              <div>
                <label className="text-xs">Organizer Email*</label>
                <Input
                  name="organizerEmail"
                  placeholder="Type the email of the event"
                  value={formik.values.organizerEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.organizerEmail &&
                  formik.errors.organizerEmail && (
                    <span className="text-red-500 text-xs">
                      {formik.errors.organizerEmail}
                    </span>
                  )}
              </div>
              <div>
                <label className="text-xs">Organizer Contact*</label>
                <Input
                  name="organizerPhone"
                  placeholder="Type organizer contact number"
                  value={formik.values.organizerPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.organizerPhone &&
                  formik.errors.organizerPhone && (
                    <span className="text-red-500 text-xs">
                      {formik.errors.organizerPhone}
                    </span>
                  )}
              </div>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={formik.isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default EmergencyInfoForm;
