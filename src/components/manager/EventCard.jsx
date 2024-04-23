import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPinned } from "lucide-react";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const EventCard = ({ event }) => {
  return (
    <Card>
      <CardHeader className="p-0 pb-2 flex-col gap-4 relative">
        <Image
          width={480}
          height={360}
          className="object-cover w-full h-full rounded-t-lg"
          src={event.thumbnail}
          alt={event.title}
        />
        <CardTitle className="text-lg px-4">Get freelance work</CardTitle>
        <Badge className="max-w-min absolute left-2 shadow" variant="secondary">
          Basic
        </Badge>
      </CardHeader>
      <CardContent className="px-4">
        <div>
          <div className="flex items-center ">
            <div className="bg-secondary rounded-lg p-2 inline-block">
              <CalendarDays className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className=" text-sm ml-2 font-medium line-clamp-1">
                1 March, 2024 - 3 March, 2024
              </span>
              <span className=" text-xs ml-2 line-clamp-1">
                Monday, 3:00 PM
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center ">
            <div className="bg-secondary rounded-lg p-2 inline-block">
              <MapPinned className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className=" text-sm ml-2 font-medium line-clamp-1">
                ACA Stadium, Barsapara
              </span>
              <span className=" text-xs ml-2 line-clamp-1">
                ENTRY - Starts From Rs 200
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
