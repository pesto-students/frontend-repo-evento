import Axios from "@/lib/Axios";
import React from "react";

const getData = async () => {
  try {
    const res = await Axios.get(`/auth/userInfo`);
    return res.data;
  } catch (error) {
    console.log("ERROR-", error.message);
  }
};

const page = async () => {
  const data = await getData();
  //   return <div>{data.data.name}</div>;
  return <div>TEST</div>;
};

export default page;
