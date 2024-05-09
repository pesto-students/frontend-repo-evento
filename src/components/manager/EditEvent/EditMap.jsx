"use client";
import React, { useState } from "react";
import FormButtons from "./FormButtons";
import { Button, Card, Input, Segmented } from "antd";
import { MapPinIcon, PlusIcon, SaveIcon } from "lucide-react";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import clsx from "clsx";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import MapMarkerModal from "./MapMarkerModal";

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0px !important;
  }
`;

const EditMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 91.77634,
    latitude: 26.184169,
    zoom: 18,
  });

  const [pins, setPins] = useState([
    {
      id: 1,
      longitude: 91.776533,
      latitude: 26.183812,
      title: "Car parking",
      desc: "Car parking for the visitors & guests",
      img: "",
      type: "amenity",
    },
    {
      id: 2,
      longitude: 91.776103,
      latitude: 26.183892,
      title: "Main Gate",
      desc: "Main entrance of the event",
      img: "",
      type: "amenity",
    },
    {
      id: 3,
      longitude: 91.776033,
      latitude: 26.183999,
      title: "Entrance Gate",
      desc: "Main entrance of the event",
      img: "https://fastly.4sqi.net/img/general/600x600/6625889_dxoweN4qQ24hEEfQ8xgfY2CtYKjLv6dt7tofn9Evc8w.jpg",
      type: "amenity",
    },
    {
      id: 4,
      longitude: 91.776009,
      latitude: 26.184522,
      title: "Restaurant",
      desc: "Veg & non-veg restaurant",
      img: "https://juantequila.net/wp-content/uploads/2020/03/Helpful-Tips-for-Planning-an-Upcoming-Party-or-Event-at-a-Restaurant-.jpg",
      type: "shop",
    },
    {
      id: 5,
      longitude: 91.776239,
      latitude: 26.184525,
      title: "GK Book stall",
      desc: "GK Book stall - GK, Govt Exam Preparaion, Previous question papers",
      img: "https://content.jdmagicbox.com/comp/chennai/s3/044pxx44.xx44.170622142901.h3s3/catalogue/p-n-s-book-stall-choolaimedu-chennai-second-hand-book-shops-htutduklcm.jpg",
      type: "shop",
    },
    {
      id: 6,
      longitude: 91.776593,
      latitude: 26.183912,
      title: "ATM",
      desc: "SBI ATM",
      img: "",
      type: "amenity",
    },
    {
      id: 7,
      longitude: 91.776389,
      latitude: 26.18451,
      title: "Assam Book stall",
      desc: "GK Book stall - GK, Govt Exam Preparaion, Previous question papers",
      img: "https://content.jdmagicbox.com/comp/chennai/s3/044pxx44.xx44.170622142901.h3s3/catalogue/p-n-s-book-stall-choolaimedu-chennai-second-hand-book-shops-htutduklcm.jpg",
      type: "shop",
    },
  ]);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentTab, setCurrentTab] = useState("amenity");
  const [modalOpen, setModalOpen] = useState(false);

  const handleMapClick = (e) => {
    console.log(e.lngLat);
    setModalOpen(true);
  };

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <FormButtons />
        </div>
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <StyledCard
                title="Event Map"
                extra={
                  <Input
                    placeholder="Search for location..."
                    allowClear
                    onChange={undefined}
                  />
                }
                className="w-full h-full"
              >
                <div className="overflow-hidden h-[300px] lg:h-[500px] relative">
                  <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    attributionControl={false}
                    transitionDuration="200"
                    onViewportChange={(viewState) => setViewState(viewState)}
                    reuseMaps
                    onClick={handleMapClick}
                  >
                    {pins.map((item, i) => (
                      <div key={i}>
                        <Marker
                          longitude={item.longitude}
                          latitude={item.latitude}
                        >
                          <button
                            onClick={() => handleMarkerClick(item.id)}
                            className={clsx(
                              "w-6 h-6 rounded-full text-white shadow text-[10px] flex items-center justify-center",
                              item.type === "amenity"
                                ? "bg-orange-600"
                                : "bg-violet-600"
                            )}
                          >
                            {i + 1}
                          </button>
                        </Marker>
                      </div>
                    ))}
                    <NavigationControl position="bottom-right" />
                  </Map>
                </div>
              </StyledCard>
            </div>

            <div className="col-span-4">
              <Card
                title="Markers"
                extra={
                  <Segmented
                    options={[
                      {
                        label: "Amenities",
                        value: "amenity",
                      },
                      {
                        label: "Stores",
                        value: "shop",
                      },
                    ]}
                    onChange={(value) => setCurrentTab(value)}
                  />
                }
                className="w-full h-full"
              >
                <div className="flex flex-col gap-3 w-full">
                  {pins
                    .filter((pin) => pin.type === currentTab)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-3 cursor-pointer bg-gray-50 rounded border border-orange-50"
                      >
                        <div className="w-8 bg-orange-100 text-orange-700 font-semibold text-[10px] flex items-center justify-center rounded-l">
                          <span>{item.id}</span>
                        </div>
                        <div className="flex-1 py-1">
                          <div className="font-medium">
                            <span className="text-sm"> {item.title}</span>
                          </div>
                          <div className="font-medium text-xs opacity-80 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                        <div className="w-10 h-10 p-1 flex items-center">
                          {item.img && (
                            <Image
                              className="w-full h-full rounded object-cover border"
                              alt=""
                              width={100}
                              height={100}
                              src={item.img}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <MapMarkerModal
        isModalOpen={modalOpen}
        handleModalCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default EditMap;
