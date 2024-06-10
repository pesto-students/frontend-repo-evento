"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useMap,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import clsx from "clsx";
import { Card, Segmented } from "antd";
import MapMarkerModal from "../others/MapMarkerModal";
import ManagerEditMarkerModal from "../others/ManagerEditMarkerModal";

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
      description: "Car parking for the visitors & guests",
      image: "",
      type: "amenity",
    },
    {
      id: 2,
      longitude: 91.776103,
      latitude: 26.183892,
      title: "Main Gate",
      description: "Main entrance of the event",
      image: "",
      type: "amenity",
    },
    {
      id: 3,
      longitude: 91.776033,
      latitude: 26.183999,
      title: "Entrance Gate",
      description: "Main entrance of the event",
      image: "",
      type: "amenity",
    },
    {
      id: 4,
      longitude: 91.776009,
      latitude: 26.184522,
      title: "Restaurant",
      description: "Veg & non-veg restaurant",
      image: "",
      type: "shop",
    },
    {
      id: 5,
      longitude: 91.776239,
      latitude: 26.184525,
      title: "GK Book stall",
      description:
        "GK Book stall - GK, Govt Exam Preparaion, Previous question papers",
      image: "",
      type: "shop",
    },
    {
      id: 6,
      longitude: 91.776593,
      latitude: 26.183912,
      title: "ATM",
      description: "SBI ATM",
      image: "",
      type: "amenity",
    },
    {
      id: 7,
      longitude: 91.776389,
      latitude: 26.18451,
      title: "Assam Book stall",
      description:
        "GK Book stall - GK, Govt Exam Preparaion, Previous question papers",
      image: "",
      type: "shop",
    },
  ]);

  const [editMarkerModalData, setEditMarkerModalData] = useState(null);
  const [isMarkerEditmodalOpen, setIsMarkerEditModalOpen] = useState(false);
  const [markerEditmodalMode, setMarkerEditModalMode] = useState("ADD");

  const [currentTab, setCurrentTab] = useState("amenity");

  const handleMarkerClick = (index) => {
    setMarkerEditModalMode("EDIT");
    setEditMarkerModalData(pins[index]);
  };

  const handleMapClick = (e) => {
    console.log(e.lngLat);
    setMarkerEditModalMode("ADD");
    setIsMarkerEditModalOpen(true);
  };

  useEffect(() => {
    if (editMarkerModalData) {
      setIsMarkerEditModalOpen(true);
    }
  }, [editMarkerModalData]);

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2 overflow-hidden h-[300px] lg:h-[600px] relative rounded-lg bg-gray-100">
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
                <Marker longitude={item.longitude} latitude={item.latitude}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkerClick(i);
                    }}
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
            <GeolocateControl position="bottom-right" />
            <NavigationControl position="bottom-right" />
            <RecenterButton className="absolute top-[8px] right-[8px]" />
          </Map>
        </div>
        <div className="col-span-3 lg:col-span-1 h-[300px] lg:h-[600px]">
          <div className="text-content h-full overflow-auto no-scrollbar">
            <Segmented
              options={[
                {
                  label: "Amenities",
                  value: "amenity",
                },
                {
                  label: "Shops & Stores",
                  value: "shop",
                },
              ]}
              onChange={(value) => setCurrentTab(value)}
              block
            />
            <div className="flex flex-col gap-3 w-full mt-6">
              {pins
                .filter((pin) => pin.type === currentTab)
                .map((item, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex gap-3 cursor-pointer bg-gray-50 rounded border ",
                      currentTab === "amenity"
                        ? "border-orange-50"
                        : "border-violet-50"
                    )}
                  >
                    <div
                      className={clsx(
                        "w-8   font-semibold text-[10px] flex items-center justify-center rounded-l",
                        currentTab === "amenity"
                          ? "text-violet-700 bg-orange-100"
                          : "text-violet-700 bg-violet-100"
                      )}
                    >
                      <span>{item.id}</span>
                    </div>
                    <div className="flex-1 py-1">
                      <div className="font-medium">
                        <span className="text-sm"> {item.title}</span>
                      </div>
                      <div className="font-medium text-xs opacity-80 mt-1 line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                    <div className="w-10 p-1 flex items-center">
                      {item?.image && (
                        <Image
                          className="w-full rounded object-cover border"
                          alt=""
                          width={100}
                          height={100}
                          src={item.image}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ManagerEditMarkerModal
        data={editMarkerModalData}
        isModalOpen={isMarkerEditmodalOpen}
        onModalCancel={() => {
          setIsMarkerEditModalOpen(false);
          setEditMarkerModalData(null);
        }}
        mode={markerEditmodalMode}
      />
    </>
  );
};

export default EventMap;
