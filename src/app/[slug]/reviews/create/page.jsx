import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import { ChevronLeft, Star } from "lucide-react";

const Page = ({ params }) => {
  const { slug } = params;
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="max-w-sm mx-auto mb-5">
        <Link href={`/${slug}/reviews`}>
          <Button variant="secondary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <Label htmlFor="title">Ratings</Label>
          <div class="flex items-center mt-2 -ml-1">
            <Star className="w-6 h-6 text-yellow-300 cursor-pointer" />
            <Star className="w-6 h-6 text-yellow-300 cursor-pointer" />
            <Star className="w-6 h-6 text-yellow-300 cursor-pointer" />
            <Star className="w-6 h-6 text-yellow-300 cursor-pointer" />
            <Star className="w-6 h-6 text-yellow-300 cursor-pointer" />
          </div>
        </div>

        <div className="mb-5">
          <Label htmlFor="description">Review</Label>
          <Textarea
            className="mt-2"
            id="description"
            placeholder="Write your review"
            required
          />
        </div>

        <div className="mb-5 text-content opacity-80">
          Your submission will be reviewed by the admin before it is published.
          You will be notified when it is published.
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default Page;
