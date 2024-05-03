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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/others/Icons";
import { useDropzone } from "react-dropzone";
import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { message } from "antd";

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

  // This is a temp fix for the react select package
  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted && (
        <>
          <div className="text-xs">Step 2 of 5</div>
          <div className="text-lg font-semibold">Upload Image</div>
          <div className="mt-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Square size image (800x800 pixels)*
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-3">
                            <ImageUpload
                              onFileUpload={(url) => {
                                field.onChange(url);
                                setUploadedThumbnail(url);
                              }}
                              type="thumbnail"
                            />
                            {uploadedThumbnail && (
                              <Image
                                alt=""
                                width={200}
                                height={200}
                                src={uploadedThumbnail}
                                className="w-20 h-20 rounded-lg"
                              />
                            )}
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
                    name="banner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banner image (1200x800 pixels)*</FormLabel>
                        <FormControl>
                          <div className="flex gap-3">
                            <ImageUpload
                              onFileUpload={(url) => {
                                field.onChange(url);
                                setUploadedBanner(url);
                              }}
                              type="thumbnail"
                            />
                            {uploadedBanner && (
                              <Image
                                alt=""
                                width={200}
                                height={200}
                                src={uploadedBanner}
                                className="w-20 h-20 rounded-lg"
                              />
                            )}
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
                  <Button variant="default" type="submit" size="sm">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default BannersForm;
