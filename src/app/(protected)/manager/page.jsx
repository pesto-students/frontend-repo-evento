"use client";

import {
  ArrowRightCircleIcon,
  MapPinIcon,
  Plus,
  SquarePenIcon,
} from "lucide-react";
import Link from "next/link";
import { Button, Segmented, Table, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Axios from "@/lib/Axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnail",
      render: (text, record, index) => {
        return (
          <Image
            width={50}
            height={50}
            alt=""
            src={text}
            className="rounded w-10 h-10"
          />
        );
      },
    },
    {
      title: "Title & Venue",
      key: "title_venue",
      render: (text, record, index) => {
        return (
          <>
            <div>{record.title}</div>
            <div className="flex items-center gap-1">
              <div>
                <MapPinIcon className="w-3 h-3 text-primary" />
              </div>
              <div>{record.venue}</div>
            </div>
          </>
        );
      },
    },
    {
      title: "Start & End Date",
      key: "startDate",
      render: (text, record, index) => {
        return (
          <>
            {record?.startDate && (
              <div>{format(record.startDate, "d MMM, yyyy - h:mm a")}</div>
            )}

            {record?.endDate && (
              <div>{format(record.endDate, "d MMM, yyyy - h:mm a")}</div>
            )}
          </>
        );
      },
    },
    {
      title: "Entry Fee",
      dataIndex: "entryFee",
      key: "entryFee",
      render: (text, record, index) => {
        return (
          <>
            {text === 0 ? <span>Free</span> : <span className="">₹{text}</span>}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return (
          <>
            <span className="text-green-500 text-xs font-medium">
              Published
            </span>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => {
        return (
          <div className="flex gap-1">
            <Link href={`/manager/events/${record.id}`}>
              <Button
                icon={<ArrowRightCircleIcon className="w-5 h-5" />}
                type="primary"
              ></Button>
            </Link>
            <Link href={`/manager/events/${record.id}/edit`}>
              <Button
                icon={<SquarePenIcon className="w-5 h-5" />}
                type="primary"
              ></Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/events`);

      const events = res.data.data.events.map((item, i) => {
        return {
          key: i,
          ...item,
        };
      });

      setEvents(events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>

      <Table
        dataSource={events}
        columns={columns}
        bordered
        title={() => (
          <div className="flex justify-between">
            <Segmented
              options={["All", "Active", "Draft", "Archieved"]}
              onChange={(value) => {
                console.log(value); // string
              }}
            />
            <Link href="/manager/events/create">
              <Button icon={<Plus className="h-3 w-3" />}>Create</Button>
            </Link>
          </div>
        )}
      />
    </>
  );
}
