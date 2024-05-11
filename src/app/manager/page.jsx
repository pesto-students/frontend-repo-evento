"use client";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button, Segmented, Table, Tag } from "antd";
import Image from "next/image";

export default function Dashboard() {
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
  const events = [
    {
      title_venue: (
        <>
          <div>Simba Uproar 2024 | Guwahati</div>
          <div>ACA Stadium Guwahati</div>
        </>
      ),
      thumbnail: (
        <Image
          width={100}
          height={100}
          className="w-10 h-10 rounded"
          alt=""
          src="https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png"
        />
      ),
      startDate: "1 March 2024, 3 PM",
      endDate: "3 march 2024",
      entryFee: 299,
      status: <Tag color="green">Active</Tag>,
      actions: (
        <div className="flex gap-2">
          <Link href="/manager/events/slug/edit">
            <Button
              type=""
              icon={<PencilIcon className="w-3 h-3 text-blue-500" />}
            />
          </Link>
          <Button
            type=""
            icon={<Trash2Icon className="w-3 h-3 text-red-500" />}
          />
        </div>
      ),
    },
    {
      title_venue: (
        <>
          <div>Simba Uproar 2024 | Guwahati</div>
          <div>ACA Stadium Guwahati</div>
        </>
      ),
      thumbnail: (
        <Image
          width={100}
          height={100}
          className="w-10 h-10 rounded"
          alt=""
          src="https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg"
        />
      ),
      startDate: "1 March 2024",
      endDate: "3 march 2024",
      entryFee: 299,
      status: <Tag color="red">Archived</Tag>,
      actions: (
        <div className="flex gap-2">
          <Button
            type=""
            icon={<PencilIcon className="w-3 h-3 text-blue-500" />}
          />
          <Button
            type=""
            icon={<Trash2Icon className="w-3 h-3 text-red-500" />}
          />
        </div>
      ),
    },
    {
      title_venue: (
        <>
          <div>Simba Uproar 2024 | Guwahati</div>
          <div>ACA Stadium Guwahati</div>
        </>
      ),
      thumbnail: (
        <Image
          width={100}
          height={100}
          className="w-10 h-10 rounded"
          alt=""
          src="https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg"
        />
      ),
      startDate: "1 March 2024",
      endDate: "3 march 2024",
      entryFee: <div className="text-green-600">Free</div>,
      status: <Tag>Draft</Tag>,
      actions: (
        <div className="flex gap-2">
          <Button
            type=""
            icon={<PencilIcon className="w-3 h-3 text-blue-500" />}
          />
          <Button
            type=""
            icon={<Trash2Icon className="w-3 h-3 text-red-500" />}
          />
        </div>
      ),
    },
  ];
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
      {events.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no events
            </h3>
            <p className="text-sm text-muted-foreground">
              Start with adding an event with our basic plan
            </p>
            <Button className="mt-4">Add Event</Button>
          </div>
        </div>
      )}
    </>
  );
}
