"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DatePicker, AutoComplete, Input, Button, message, Card } from "antd";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

const isValidLng = (lng) => {
  if (!lng) return true;
  return lng >= -180 && lng <= 180;
};

const isValidLat = (lat) => {
  if (!lat) return true;
  return lat >= -90 && lat <= 90;
};

const validationSchema = Yup.object({
  venue: Yup.string().required("Venue is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date().nullable(),
  entryFee: Yup.string().required("Entry fee is required"),
  longitude: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLng)
    .required("Location is required"),
  latitude: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLat)
    .required("Location is required"),
});

const VenueForm = () => {
  const { setEvent, event, setSteps, setActiveStep } = useCreateEventContext();

  const [viewState, setViewState] = useState({
    longitude: event?.longitude || 78.9629,
    latitude: event?.latitude || 20.5937,
    zoom: event?.longitude ? 16 : 4,
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      venue: event.venue || "",
      startDate: event.startDate || null,
      endDate: event.endDate || null,
      entryFee: event.entryFee || "",
      latitude: event.latitude,
      longitude: event.longitude,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setEvent((prev) => {
        return {
          ...prev,
          ...values,
        };
      });
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === 3 ? { ...step, isComplete: true } : step
        )
      );
      setActiveStep(4);
      setSubmitting(false);
    },
  });

  const handleMapMove = (evt) => {
    setViewState(evt.viewState);
    formik.setFieldValue("longitude", evt?.viewState?.longitude);
    formik.setFieldValue("latitude", evt?.viewState?.latitude);
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
    formik.setFieldValue("longitude", option.value[0]);
    formik.setFieldValue("latitude", option.value[1]);
    setViewState({
      longitude: value[0],
      latitude: value[1],
      zoom: 16,
    });
  };

  return (
    <>
      <div className="text-xs">Step 3 of 5</div>
      <div className="text-lg font-semibold">Set Venue & Time</div>
      <Card className="!mt-12">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label className="text-xs">Venue*</label>
            <Input
              name="venue"
              placeholder="Sarusajai stadium, Guwahati..."
              value={formik.values.venue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                formik.touched.venue && formik.errors.venue ? "error" : ""
              }
            />
            {formik.touched.venue && formik.errors.venue ? (
              <div className="text-red-600 text-xs">{formik.errors.venue}</div>
            ) : null}
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-2 flex flex-col">
              <label className="text-xs">Start Date</label>
              <DatePicker
                showTime
                use12Hours
                format={"YYYY-MM-DD hh:mm"}
                onChange={(value) => formik.setFieldValue("startDate", value)}
                value={formik.values.startDate}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.startDate}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 flex flex-col">
              <label className="text-xs">End Date</label>
              <DatePicker
                showTime
                use12Hours
                format={"YYYY-MM-DD hh:mm"}
                onChange={(value) => formik.setFieldValue("endDate", value)}
                value={formik.values.endDate}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.endDate}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label className="text-xs">Minimum entry fee (Start from)</label>
            <Input
              name="entryFee"
              placeholder="Entry fee"
              value={formik.values.entryFee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                formik.touched.entryFee && formik.errors.entryFee ? "error" : ""
              }
            />
            {formik.touched.entryFee && formik.errors.entryFee ? (
              <div className="text-red-600 text-xs">
                {formik.errors.entryFee}
              </div>
            ) : null}
          </div>
          <div>
            <label className="text-xs">Search location</label>
            <AutoComplete
              options={autoCompleteOptions}
              onSearch={handleSearch}
              onSelect={handleSelect}
              onChange={(value) => formik.setFieldValue("location", value)}
              value={formik.values.location}
              status={
                formik.touched.location && formik.errors.location ? "error" : ""
              }
              className="w-full"
            >
              <Input
                name="location"
                placeholder="Type the location"
                onBlur={formik.handleBlur}
              />
            </AutoComplete>
            {formik.touched.coordinates && formik.errors.coordinates ? (
              <div className="text-red-600 text-xs">
                {formik.errors.coordinates}
              </div>
            ) : null}
            <div className="overflow-hidden mt-3 h-[300px] relative rounded-lg bg-gray-100">
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
                  <MapPin className="w-8 h-8 stroke-red-700 stroke-1 fill-red-400" />
                </Marker>
              </Map>
            </div>
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              loading={formik.isSubmitting}
            >
              Next
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default VenueForm;
