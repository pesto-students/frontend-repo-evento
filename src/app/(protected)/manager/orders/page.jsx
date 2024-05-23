import { auth } from "@/auth";
import React from "react";

const getData = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;

  const res = await fetch("http://localhost:8000/api/v1/auth/userInfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const page = async () => {
  const data = await getData();
  return <div>{data.data.name}</div>;
};

export default page;
