import Axios from "@/lib/Axios";
import {
  Modal,
  message,
  Input,
  Select,
  DatePicker,
  InputNumber,
  AutoComplete,
} from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Map, { Marker } from "react-map-gl";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
});

const ManagerEditVenueModal = ({
  event,
  allCategories,
  isModalOpen,
  onModalCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [viewState, setViewState] = useState({
    longitude: event?.lng || 78.9629,
    latitude: event?.lat || 20.5937,
    zoom: event?.lng ? 16 : 4,
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: event?.title || "",
      description: event?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    setFieldValue,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = formik;

  const handleMapMove = (evt) => {
    setViewState(evt.viewState);
    setFieldValue("lng", evt?.viewState?.longitude);
    setFieldValue("lat", evt?.viewState?.latitude);
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
      ...viewState,
      longitude: value[0],
      latitude: value[1],
      zoom: 16,
    });
  };

  return (
    <Modal
      title="Update Venue & Date"
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={onModalCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <div className="flex flex-col gap-3 my-6">
        <div>
          <label className="text-xs text-gray-500">Categories*</label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            onChange={() => {}}
            options={allCategories}
            className="!mt-1"
          />
          {touched.title && errors.title ? (
            <div className="text-red-500 text-xs">{errors.title}</div>
          ) : null}
        </div>
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
              onOk={() => {}}
              className="w-full !mt-1"
            />
            {touched.title && errors.title ? (
              <div className="text-red-500 text-xs">{errors.title}</div>
            ) : null}
          </div>
          <div>
            <label className="text-xs text-gray-500">End Date*</label>
            <DatePicker
              id="startDate"
              showTime
              use12Hours
              format={"YYYY-MM-DD hh:mm"}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={() => {}}
              className="w-full !mt-1"
            />
            {touched.title && errors.title ? (
              <div className="text-red-500 text-xs">{errors.title}</div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Venue</label>
            <Input id="venue" placeholder="Type venue" className="!mt-1" />
            {touched.title && errors.title ? (
              <div className="text-red-500 text-xs">{errors.title}</div>
            ) : null}
          </div>
          <div>
            <label className="text-xs text-gray-500">Entry Fee</label>
            <InputNumber
              id="entryFee"
              placeholder="Basic usage"
              className="!w-full !mt-1"
            />
            {touched.title && errors.title ? (
              <div className="text-red-500 text-xs">{errors.title}</div>
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
                <EnvironmentOutlined />
              </Marker>
            </Map>
            <div className="w-full absolute top-0 flex justify-end p-1">
              <AutoComplete
                options={autoCompleteOptions}
                onSearch={handleSearch}
                onSelect={handleSelect}
                onChange={(value) => formik.setFieldValue("location", value)}
                value={formik.values.location}
                status={
                  formik.touched.location && formik.errors.location
                    ? "error"
                    : ""
                }
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
