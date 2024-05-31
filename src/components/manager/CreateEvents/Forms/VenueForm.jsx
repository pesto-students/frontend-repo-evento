"use client";

import React, { useState } from "react";
import { DatePicker, Input, Button, message, Card } from "antd";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const VenueForm = () => {
  const [viewState, setViewState] = useState({
    longitude: 91.77634,
    latitude: 26.184169,
    zoom: 18,
  });

  const onSubmit = (values) => {
    const categories = values.categories.map((cat) => cat.value);
    values = { ...values, categories };
    console.log(values);
    // call api to save data
    message.success(
      "Event details are saved. You can proceed to the next step now!"
    );
  };

  return (
    <>
      <div className="text-xs">Step 3 of 5</div>
      <div className="text-lg font-semibold">Set Venue & Time</div>
      <Card className="!mt-12">
        <form className="space-y-8">
          <div>
            <label>Venue*</label>
            <Input placeholder="Sarusajai stadium, Guwahati..." />
          </div>
          <div className=" grid grid-cols-4 gap-3">
            <div className="col-span-2 flex flex-col">
              <label>Start Date</label>
              <DatePicker
                showTime
                use12Hours
                format={"YYYY-MM-DD hh:mm"}
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                onOk={undefined}
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <label>End Date</label>
              <DatePicker
                showTime
                use12Hours
                format={"YYYY-MM-DD hh:mm"}
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                onOk={undefined}
              />
            </div>
          </div>
          <div>
            <label>Minimum entry fee (Start from)</label>
            <Input placeholder="Entry fee" />
          </div>
          <div>
            <div>
              <label>Select location</label>
              <Input placeholder="Entry fee" />
            </div>
            <div className="overflow-hidden mt-3 h-[300px] relative rounded-lg bg-gray-100">
              <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                attributionControl={false}
                transitionDuration="200"
                onViewportChange={(viewState) => setViewState(viewState)}
                reuseMaps
              >
                <Marker
                  longitude={91.77634}
                  latitude={26.184169}
                  anchor="bottom"
                >
                  <MapPin className="w-8 stroke-black stroke-1 fill-red-600" />
                </Marker>
              </Map>
            </div>
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default VenueForm;
