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

export const createEventSchema = Yup.object({
  title: Yup.string()
    .required("Title is required in Event Info")
    .max(100, "Title must be at most 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(5000, "Description must be at most 5000 characters"),
  categories: Yup.array().min(1, "At least one category is required"),
  thumbnailUrl: Yup.string()
    .url("Invalid URL")
    .required("Thumbnail is required"),
  bannerUrl: Yup.string().url("Invalid URL").required("Banner is required"),
  videoUrl: Yup.string().url("Invalid URL"),
  venue: Yup.string().required("Venue is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date().nullable(),
  entryFee: Yup.number().required("Entry fee is required"),
  longitude: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLng)
    .required("Location is required"),
  latitude: Yup.number()
    .test("isValidCoordinates", "Invalid coordinates", isValidLat)
    .required("Location is required"),
  organizerName: Yup.string().required("Organizer Name is required"),
  organizerEmail: Yup.string()
    .email("Invalid email address")
    .required("Organizer Email is required"),
  organizerPhone: Yup.string().required("Organizer Contact is required"),
});
