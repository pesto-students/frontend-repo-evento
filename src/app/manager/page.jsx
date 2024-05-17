"use client";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button, Segmented, Table, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "@/lib/config";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const session = useSession();

  const headers = {
    Authorization: `Bearer ${session?.data?.user?.accessToken}`,
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
    },
    {
      title: "Title & Venue",
      dataIndex: "title_venue",
      key: "title_venue",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Entry Fee",
      dataIndex: "entryFee",
      key: "entryFee",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${NEXT_PUBLIC_API_BASE_URL}/events`, {
          headers,
        });
        setEvents(res.data.data.events);
        console.log(session);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>
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
      <Table dataSource={events} columns={columns} />
    </>
  );
}
