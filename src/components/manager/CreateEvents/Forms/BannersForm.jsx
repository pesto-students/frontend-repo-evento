"use client";

import React, { useCallback, useEffect, useState } from "react";
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

import { useDropzone } from "react-dropzone";
import {
  ImageIcon,
  LoaderCircle,
  LoaderCircleIcon,
  PlusCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { Button, Card, Input, Upload, message } from "antd";

// Separate component for image upload
const ImageUpload = ({ onFileUpload, type }) => {
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setIsUploading(true);
      const file = acceptedFiles[0];
      // Upload to our own backend (Backend will upload it to cloudinary after processing)

      const url =
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png";

      setTimeout(() => {
        onFileUpload(url);
        setIsUploading(false);
      }, 3000);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="h-20 w-20 rounded-lg border border-dashed cursor-pointer flex justify-center items-center">
        {!isUploading ? (
          <ImageIcon className="w-5 stroke-gray-300 stroke-1" />
        ) : (
          <LoaderCircle className="w-5 stroke-gray-300 stroke-1 animate-spin" />
        )}
      </div>
    </div>
  );
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
            <div className="grid grid-cols-12">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Square size image
                        <br />
                        (800x800 pixels)*
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3">
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {uploadedThumbnail ? (
                              <Image
                                src={uploadedThumbnail}
                                alt="avatar"
                                width={100}
                                height={100}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-8">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Banner image
                        <br />
                        (1200x800 pixels)*
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3">
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {uploadedBanner ? (
                              <Image
                                src={uploadedBanner}
                                alt="avatar"
                                width={100}
                                height={100}
                                className="w-full"
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
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
              <Button type="primary">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default BannersForm;
