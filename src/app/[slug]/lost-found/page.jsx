"use client";
import { FolderSearch, Plus } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const LostAndFound = () => {
  const { slug } = useParams();
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <FolderSearch className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Lost & Found
          </h2>
        </div>
        <div>
          <Link href={`/${slug}/lost-found/create`}>
            <Button variant="ghost">
              <Plus className="w-4 h-4 mr-1" />
              <span>Post something</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <Card className="text-content col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader className="flex flex-row ">
            <div className="flex flex-1 gap-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-medium">Jenny Wilson</div>
                <div className="text-xs">Sun, 24 Nov 2023 - 4:45 PM</div>
              </div>
            </div>
            <div>
              <Badge variant="success">Found</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-medium">Found an Apple Mobile</div>
            <div className="font-medium text-sm opacity-80">
              I have found a black apple mobile near the stage
            </div>
            <div className="flex mt-2 gap-2">
              <Image
                className="w-20 h-20 rounded object-cover border"
                alt=""
                width={100}
                height={100}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKm3pi311sa6lxAsjnRr1BIvAnYWBamz4xA&usqp=CAU"
              />
              <Image
                className="w-20 h-20 rounded object-cover border"
                alt=""
                width={100}
                height={100}
                src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F09%2Fiphone-15-pro-max-hands-on-review-1.jpg?cbr=1&q=90"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="text-content col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader className="flex flex-row ">
            <div className="flex flex-1 gap-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-medium">Jenny Wilson</div>
                <div className="text-xs">Sun, 24 Nov 2023 - 4:45 PM</div>
              </div>
            </div>
            <div>
              <Badge>Lost</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-medium">Office I-Card</div>
            <div className="font-medium text-sm opacity-80">
              Lost my office I-Card somewhere in the event
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LostAndFound;
