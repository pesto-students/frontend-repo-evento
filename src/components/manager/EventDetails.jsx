import { Card, Collapse, Table, Tag } from "antd";
import {
  CalendarDays,
  MapPinned,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const EventDetails = () => {
  const sponsors = [
    {
      imageUrl:
        "https://dp6mhagng1yw3.cloudfront.net/entries/oeW_Jt_JBL_CordFail_Banner.jpg",
      link: "https://in.jbl.com/",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/90/00/5b/90005b7e1e8f97de1b41269b0932c95b.jpg",
      link: "https://in.jbl.com/",
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <Image
          width={480}
          height={360}
          src="https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1702288015%2Fdhlkrsbpopg5cfpnz23n.jpg"
          className="w-full object-cover rounded-md"
          alt="Event Spotlight"
        />
        <div className="mt-6">
          <div className="font-medium text-xl">B Praak Live - Guwahati</div>
          <div className="mt-3">
            <p>
              Simba Uproar is back for its highly anticipated second season of
              the country’s wildest experience. After a thrilling debut season,
              Simba Uproar 2.0 promises to be bigger, bolder, and more
              captivating than ever before, as it expands to six vibrant cities
              across India.
            </p>
            <p>
              Mumbai, Delhi, Bengaluru, Pune, Guwahati and Panchkula - Simba
              Uproar 2.0 aims to unite music enthusiasts from all corners of the
              country for an unparalleled celebration of music and culture. The
              second season of Simba Uproar is set to take the country by storm,
              with a line-up of stellar performances by upcoming hip-hop
              artists, electrifying music acts, along with immersive
              experiences, including interactive installations, special
              performances, creating an atmosphere of fun and excitement. Join
              Simba Uproar’s #THEWILDTRIBE & roar harder, Together!
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="font-medium">INSTRUCTIONS</div>
          <ul className="space-y-1 mt-3 list-disc list-inside">
            <li>Please carry a valid ID proof along with you. </li>
            <li>
              No refunds on purchased ticket are possible, even in case of any
              rescheduling.
            </li>
            <li>
              Security procedures, including frisking remain the right of the
              management.
            </li>
            <li>
              No dangerous or potentially hazardous objects including but not
              limited to weapons, knives, guns, fireworks, helmets, lazer
              devices, bottles, musical instruments will be allowed in the venue
              and may be ejected with or without the owner from the venue.
            </li>
          </ul>
        </div>
        <div className="mt-12">
          <div className="font-medium">EMERGENCY</div>
          <div className="flex flex-col mt-3 gap-1">
            <div>
              <h5 className="font-semibold">Police</h5>
              <div>Chandmari Police Station, Ph - 8888888888, 7878787878</div>
            </div>
            <div>
              <h5 className="font-semibold">Event Security</h5>
              <div>Ph - 8888888888, 7878787878</div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="font-medium">OFFICIAL SPONSORS</div>
          <div className="grid grid-cols-3 gap-6 mt-3">
            {sponsors.map((item, i) => (
              <div key={i} className="flex flex-col">
                <Image
                  width={480}
                  height={360}
                  src={item.imageUrl}
                  className="w-full flex-1 rounded-md"
                  alt="Event Spotlight"
                />
                <div className="py-2">
                  <a href="#" target="_blank" className="text-gray-500">
                    <div className="flex gap-2">
                      <SquareArrowOutUpRightIcon className="w-3" />
                      <span> {item.link}</span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <Card>
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
          <div className="mt-3">
            <Tag>Music</Tag>
            <Tag>Cultural</Tag>
          </div>
        </Card>
        <Card className="!mt-6">
          <div className="font-medium">Organiser Info</div>
          <div className="mt-3 flex flex-col gap-1">
            <div className="grid grid-cols-3">
              <div>Name:</div>
              <div className="col-span-2">Pride East Entertainment pvt ltd</div>
            </div>
            <div className="grid grid-cols-3">
              <div>Email:</div>
              <div className="col-span-2">support@prideeast.com</div>
            </div>
            <div className="grid grid-cols-3">
              <div>Contact:</div>
              <div className="col-span-2">+91 3330008897</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventDetails;
