"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ChevronLeft, X } from "lucide-react";

function Page({ params }) {
  const [images, setImages] = useState([]);

  const { slug } = params;

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.slice(0, 2);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: true,
    maxFiles: 2,
  });

  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="max-w-sm mx-auto mb-5">
        <Link href={`/${slug}/lost-found`}>
          <Button variant="secondary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <Label htmlFor="contact">Contact no</Label>
          <Input
            className="mt-2"
            type="text"
            id="contact"
            placeholder="Your contact number"
            required
          />
        </div>

        <div className="mb-5">
          <Label htmlFor="title">Title</Label>
          <Input
            className="mt-2"
            type="text"
            id="title"
            placeholder="Found a wallet"
            required
          />
        </div>

        <div className="mb-5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="mt-2"
            id="description"
            placeholder="Write about your post"
            required
          />
        </div>

        <div className="mb-5">
          <div
            {...getRootProps()}
            className="border border-dashed rounded-md p-5 text-center cursor-pointer mb-5"
          >
            <input {...getInputProps()} />
            <p className="text-xs text-content opacity-70">
              Drag & drop up to 2 images here, or click to select images
            </p>
          </div>
          <div className="flex gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 rounded object-cover border"
                  height={100}
                  width={100}
                />
                <button onClick={() => removeImage(index)}>
                  <X className="w-5 h-5 absolute text-primary -top-2 -right-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <RadioGroup defaultValue="lost">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lost" id="r1" />
              <Label htmlFor="r1">I have lost this item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="found" id="r2" />
              <Label htmlFor="r2">I have found this item</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-5 text-content opacity-80">
          Your submission will be reviewed by the admin before it is published.
          You will be notified when it is published.
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}

export default Page;
