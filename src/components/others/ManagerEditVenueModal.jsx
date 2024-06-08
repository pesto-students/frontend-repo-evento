import Axios from "@/lib/Axios";
import {
  Modal,
  message,
  Input,
  DatePicker,
  InputNumber,
  AutoComplete,
} from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import dayjs from "dayjs";
import { editVenueSchema } from "@/validationSchemas";

const ManagerEditVenueModal = ({ event, isModalOpen, onModalCancel }) => {
  const [viewState, setViewState] = useState({
    longitude: event?.lng,
    latitude: event?.lat,
    zoom: 16,
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      venue: event.venue,
      startDate: event.startDate,
      endDate: event.endDate,
      entryFee: event.entryFee,
      lat: event.lat,
      lng: event.lng,
    },
    validationSchema: editVenueSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      message.success("Data saved successfully!");
      setTimeout(() => setSubmitting(false), 2000);
    },
  });

  const handleMapMove = (evt) => {
    setViewState(evt.viewState);
    formik.setFieldValue("lng", evt?.viewState?.longitude);
    formik.setFieldValue("lat", evt?.viewState?.latitude);
  };

  const handleSearch = async (value) => {
    if (value) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
          {
            params: {
              access_token: process.env.NEXT_PUBLIC_MAPBOX,
              autocomplete: true,
              limit: 5,
            },
          }
        );
        setAutoCompleteOptions(
          response.data.features.map((feature) => ({
            label: feature.place_name,
            value: feature.geometry.coordinates,
          }))
        );
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setAutoCompleteOptions([]);
      }
    } else {
      setAutoCompleteOptions([]);
    }
  };

  const handleSelect = (value, option) => {
    formik.setFieldValue("lng", option.value[0]);
    formik.setFieldValue("lat", option.value[1]);
    setViewState({
      longitude: value[0],
      latitude: value[1],
      zoom: 16,
    });
  };

  return (
    <Modal
      title="Update Venue & Date"
      open={isModalOpen}
      onOk={formik.handleSubmit}
      onCancel={onModalCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: formik.isSubmitting,
      }}
      centered
    >
      <div className="flex flex-col gap-3 my-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Start Date*</label>
            <DatePicker
              id="startDate"
              showTime
              use12Hours
              format={"YYYY-MM-DD hh:mm"}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              value={
                formik.values.startDate ? dayjs(formik.values.startDate) : null
              }
              onOk={() => {}}
              className="w-full !mt-1"
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-red-500 text-xs">
                {formik.errors.startDate}
              </div>
            ) : null}
          </div>
          <div>
            <label className="text-xs text-gray-500">End Date*</label>
            <DatePicker
              id="endDate"
              showTime
              use12Hours
              format={"YYYY-MM-DD hh:mm"}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              value={
                formik.values.endDate ? dayjs(formik.values.endDate) : null
              }
              onOk={() => {}}
              className="w-full !mt-1"
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-red-500 text-xs">
                {formik.errors.endDate}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Venue</label>
            <Input
              id="venue"
              placeholder="Type venue"
              className="!mt-1"
              value={formik.values.venue}
            />
            {formik.touched.venue && formik.errors.venue ? (
              <div className="text-red-500 text-xs">{formik.errors.venue}</div>
            ) : null}
          </div>
          <div>
            <label className="text-xs text-gray-500">Entry Fee</label>
            <InputNumber
              id="entryFee"
              placeholder="Basic usage"
              className="!w-full !mt-1"
              value={formik.values.entryFee}
            />
            {formik.touched.entryFee && formik.errors.entryFee ? (
              <div className="text-red-500 text-xs">
                {formik.errors.entryFee}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div className="overflow-hidden mt-3 h-[400px] relative rounded-lg bg-gray-100">
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
              {...viewState}
              onMove={handleMapMove}
              mapStyle="mapbox://styles/mapbox/outdoors-v12"
              attributionControl={false}
              transitionDuration="200"
              reuseMaps
            >
              <Marker
                longitude={viewState.longitude}
                latitude={viewState.latitude}
                anchor="bottom"
              >
                <MapPinIcon className="size-6 stroke-primary" />
              </Marker>
            </Map>
            <div className="w-full absolute top-0 flex justify-end p-1">
              <AutoComplete
                options={autoCompleteOptions}
                onSearch={handleSearch}
                onSelect={handleSelect}
                className="!w-full"
              >
                <Input
                  name="location"
                  placeholder="Type the location"
                  onBlur={formik.handleBlur}
                  className="!bg-[#fffffff5]"
                />
              </AutoComplete>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManagerEditVenueModal;
