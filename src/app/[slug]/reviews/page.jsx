"use client";

import RatingStar from "@/components/others/RatingStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PenLine } from "lucide-react";
import React from "react";
import { totalRatings, reviews } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";

const Page = () => {
  const { slug } = useParams();
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <PenLine className="text-primary w-5 -mt-1" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Reviews
          </h2>
        </div>
        <div>
          <Link href={`/${slug}/reviews/create`}>
            <Button variant="ghost">
              <HiPlus className="w-4 h-4 mr-1" />
              <span>Write review</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-6 mt-6 gap-6">
        <div className="col-span-6 lg:col-span-3">
          <RatingStar />
          <p class="text-sm font-medium text-gray-500 mt-1">5 total ratings</p>
          <div className="flex flex-col gap-4 mt-4">
            {totalRatings.map((item, i) => (
              <div key={i} class="flex items-center">
                <span class="text-sm font-medium text-gray-500">
                  {item.rating} star
                </span>
                <div class="w-2/4 mx-4">
                  <Progress value={item.percentage} />
                </div>
                <span class="text-sm font-medium text-gray-500">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 col-span-6 lg:col-span-3 ">
          {reviews.map((item, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center text-content">
                    <Avatar>
                      <AvatarImage src={item.user.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{item.user.name}</div>
                      <div className="text-xs opacity-80">{item.createdAt}</div>
                    </div>
                  </div>
                  <div>
                    <RatingStar />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="opacity-80">{item.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
