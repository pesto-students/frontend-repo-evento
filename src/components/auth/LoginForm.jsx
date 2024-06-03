"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  const { setUser } = useAppContext();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "john@mail.com",
      password: "test123",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post("/api/auth/login", values);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        setUser(res.data.data.user);
        router.push("/manager");
      } catch (error) {
        message.error("Error in login: " + error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="rounded-lg bg-white shadow-sm w-10/12 lg:w-10/12 xl:w-6/12 max-w-[400px] border">
      <div className="p-6">
        <div className="mb-6 text-primary font-semibold text-xl">Evento</div>
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Please enter your email to continue"
            validateStatus={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
            help={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          >
            <Input
              type="email"
              name="email"
              placeholder="Type your email here..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label="Please enter the password"
            validateStatus={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            help={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          >
            <Input
              type="password"
              name="password"
              placeholder="Type your password here..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={formik.isSubmitting}
          >
            Login
          </Button>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Create now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
