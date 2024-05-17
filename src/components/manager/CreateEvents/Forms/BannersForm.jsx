"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  LoaderCircleIcon,
  PlusCircleIcon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import { Button, Card, Input, Upload, message } from "antd";

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const BannersForm = () => {
  const [messageApi] = message.useMessage();
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null);
  const [uploadedBanner, setUploadedBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  // This is a temp fix for the react select package
  const [isMounted, setIsMounted] = useState(false);

  const formSchema = z.object({
    thumbnail: z.string().url(),
    banner: z.string().url(),
    videoUrl: z.string().url(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",
      banner:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
      videoUrl: "https://www.youtube.com/watch?v=71X-KA5MTHk",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    // call api to save data
    messageApi.open({
      type: "success",
      content: "Event details are saved. You can proceed to the next step now!",
    });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setUploadedThumbnail(url);
      });
    }
  };

  // This is a temp fix for the react select package
  useEffect(() => setIsMounted(true), []);

  const uploadButton = (
    <button>
      {loading ? (
        <LoaderCircleIcon className="text-gray-300 animate-spin" />
      ) : (
        <PlusCircleIcon className="text-gray-300" />
      )}
    </button>
  );

  return (
    <>
      <div className="text-xs">Step 2 of 5</div>
      <div className="text-lg font-semibold">Upload Image</div>
      <Card className="!mt-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square size image (800x800 pixels)*</FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        <Upload {...props}>
                          <Button
                            icon={<UploadCloudIcon className="w-3.5 h-3.5" />}
                          >
                            Click to Upload
                          </Button>
                        </Upload>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner image (1200x800 pixels)*</FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        <Upload {...props}>
                          <Button
                            icon={<UploadCloudIcon className="w-3.5 h-3.5" />}
                          >
                            Click to Upload
                          </Button>
                        </Upload>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube video link*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=ABCD123XYZ"
                        {...field}
                        className="placeholder:text-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="primary">Next</Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default BannersForm;
