import * as Yup from "yup";

const isValidLng = (lng) => {
  if (!lng) return true;
  return lng >= -180 && lng <= 180;
};

const isValidLat = (lat) => {
  if (!lat) return true;
  return lat >= -90 && lat <= 90;
};

export const editVenueSchema = Yup.object({
  venue: Yup.string().required("Venue is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date().nullable().required("End date is required"),
  entryFee: Yup.string().required("Entry fee is required"),
  lng: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLng)
    .required("Location is required"),
  lat: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLat)
    .required("Location is required"),
});

export const editEventSchema = Yup.object({
  title: Yup.string().required(),
  categories: Yup.array().min(1, "At least one category is required"),
  description: Yup.string().required(),
});

export const editItinerarySchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
});

export const editMarkerSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),
  type: Yup.string().required("Type is required"),
  number: Yup.number()
    .required("Number is required")
    .min(1, "Number must be at least 1")
    .max(10, "Number must be at most 10"),
  thumbnailUrl: Yup.string().required("Thumbnail is required"),
});
