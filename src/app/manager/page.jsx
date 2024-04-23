"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import EventCard from "@/components/manager/EventCard";
import Link from "next/link";

export default function Dashboard() {
  const events = [
    {
      title: "SANAM Live",
      thumbnail:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png",
    },
    {
      title: "Simba Uproar 2024 | Guwahati",
      thumbnail:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg",
    },
    {
      title: "Kanan Gill Experience - India Tour 2024 - Guwahati",
      thumbnail:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
    },
    {
      title: "Kisi Ko Batana Mat by Anubhav Singh Bassi",
      thumbnail:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",
    },
  ];
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>
      <Tabs defaultValue="active">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="month">Draft</TabsTrigger>
            <TabsTrigger value="year">Archieved</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/manager/events/create">
              <Button variant="outline" className="gap-1 text-sm">
                <Plus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Create</span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="active">
          <div className="grid grid-cols-4 gap-6 mt-12">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
