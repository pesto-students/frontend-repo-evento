"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, message, Select } from "antd";
import Link from "next/link";
import Axios from "@/lib/Axios";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string()
    .oneOf(["MANAGER", "USER"], "Role must be either MANAGER or USER")
    .required("Role is required"),
});

const SignupForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Axios.post(`/auth/signup`, values);
        message.success("Signup successfull! Please login.");
        router.push("/login");
      } catch (error) {
        message.error("Error in signup: " + error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="rounded-lg bg-white shadow-sm w-10/12 lg:w-10/12 xl:w-6/12 max-w-[400px] border">
      <div className="p-6">
        <div className="mb-6 text-primary font-semibold text-xl">Evento</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-500"
            >
              Please enter your name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Type your name here..."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-500"
            >
              Please enter your email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Type your email here..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full ${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-500"
            >
              Choose a password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Type your password here..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full ${formik.touched.password && formik.errors.password ? "border-red-500" : ""}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-500"
            >
              Re-enter the password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Type your password here..."
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-xs font-medium text-gray-500"
            >
              What type of user you are?
            </label>
            <Select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={(value) => formik.setFieldValue("role", value)}
              className={`w-full ${formik.touched.role && formik.errors.role ? "border-red-500" : ""}`}
              options={[
                { value: "USER", label: "I want to explore events" },
                {
                  value: "MANAGER",
                  label: "I want to publish & manage events",
                },
              ]}
            />
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-xs">{formik.errors.role}</div>
            ) : null}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={formik.isSubmitting}
          >
            Signup
          </Button>
        </form>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
