"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  useMap,
} from "react-map-gl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import clsx from "clsx";

const StyledPopup = styled(Popup)`
  .mapboxgl-popup-content {
    padding: 0;
    border-radius: 10px;
    font-family: Roboto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 240px;
  }
  .mapboxgl-popup-close-button {
    right: 5px;
    padding: 3px;
    font-size: 18px;
    color: #222222;
    background: none;
    outline: none;
  }
`;

const RecenterButton = ({ className }) => {
  const { current: map } = useMap();

  const onClick = () => {
    map.flyTo({ center: [91.77634, 26.184169], zoom: 18 });
  };

  return (
    <button
      type="button"
      className={clsx(
        "flex items-center justify-center w-[29px] h-[29px] bg-white rounded-[5px] border-2 border-gray-300 shadow-md",
        className
      )}
      onClick={onClick}
    >
      <MapPin className="w-4 fill-red-500 stroke-white" />
      <span className="sr-only">Re-center</span>
    </button>
  );
};

const EventMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 91.77634,
    latitude: 26.184169,
    zoom: 18,
  });
  const [pins] = useState([
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2 overflow-hidden h-[300px] lg:h-[500px] relative rounded-lg bg-gray-100">
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
            {pins.map((item, i) => (
              <div key={i}>
                <Marker longitude={item.longitude} latitude={item.latitude}>
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

                {item.id === currentPlaceId && (
                  <StyledPopup
                    longitude={item.longitude}
                    latitude={item.latitude}
                    anchor="bottom"
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                  >
                    {item.img && (
                      <Image
                        className="w-full rounded-t-[10px] border"
                        alt=""
                        width={400}
                        height={400}
                        src={item.img}
                      />
                    )}
                    <div className="p-3 text-content">
                      <div className="font-bold mb-2">{item.title}</div>
                      <div className="leading-tight">{item.desc}</div>
                    </div>
                  </StyledPopup>
                )}
              </div>
            ))}
            <GeolocateControl position="bottom-right" />
            <NavigationControl position="bottom-right" />
            <RecenterButton className="absolute top-[8px] right-[8px]" />
          </Map>
        </div>
        <div className="col-span-3 lg:col-span-1 h-[300px] lg:h-[500px]">
          <Card className="text-content h-full overflow-auto no-scrollbar">
            <Tabs defaultValue="amenities" className="w-full">
              <CardHeader className="flex flex-row">
                <TabsList className="grid w-full grid-cols-2 ">
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="shops">Shops & Stores</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="amenities">
                  <div className="flex flex-col gap-3 w-full">
                    {pins
                      .filter((pin) => pin.type === "amenity")
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
                            <div className="font-medium text-xs opacity-80 mt-1 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                          <div className="w-10 p-1 flex items-center">
                            {item.img && (
                              <Image
                                className="w-full rounded object-cover border"
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
                </TabsContent>
                <TabsContent value="shops">
                  <div className="flex flex-col gap-3 w-full">
                    {pins
                      .filter((pin) => pin.type === "shop")
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-3 cursor-pointer bg-gray-50 rounded border border-violet-50"
                        >
                          <div className="w-8 bg-violet-100 text-violet-700 font-semibold text-[10px] flex items-center justify-center rounded-l">
                            <span>{item.id}</span>
                          </div>
                          <div className="flex-1 py-1">
                            <div className="font-medium">
                              <span className="text-sm"> {item.title}</span>
                            </div>
                            <div className="font-medium text-xs opacity-80 mt-1 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                          <div className="w-10 p-1 flex items-center">
                            {item.img && (
                              <Image
                                className="w-full rounded object-cover border"
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
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventMap;
