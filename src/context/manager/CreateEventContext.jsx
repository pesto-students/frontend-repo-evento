"use client";

import { ImageIcon, MapPinned, Ticket } from "lucide-react";

const { createContext, useState, useContext, useEffect } = require("react");

const CreateEventContext = createContext();

export const CreateEventProvider = ({ children }) => {
  const [eventCategories, setEventCategories] = useState([]);
  const [activeStep, setActiveStep] = useState(2);
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Event info",
      description: "Title, Category & Description",
      isComplete: false,
      icon: <Ticket className="w-3.5 text-gray-500" />,
    },
    {
      id: 2,
      title: "Banners",
      description: "Event thumbnail & banner",
      isComplete: false,
      icon: <ImageIcon className="w-3.5 text-gray-500" />,
    },
    {
      id: 3,
      title: "Venue & Time",
      description: "Event venue & date",
      isComplete: false,
      icon: <MapPinned className="w-3.5 text-gray-500" />,
    },
  ]);

  useEffect(() => {
    //  Fetch event categories from api
    setEventCategories([
      {
        id: 1,
        title: "Music",
      },
      {
        id: 2,
        title: "Festivals & Fairs",
      },
      {
        id: 3,
        title: "Food & Drink",
      },
      {
        id: 4,
        title: "Cars & Bikes",
      },
    ]);
  }, []);

  return (
    <CreateEventContext.Provider
      value={{
        steps,
        setSteps,
        activeStep,
        setActiveStep,
        eventCategories
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};

export const useCreateEventContext = () => {
  return useContext(CreateEventContext);
};
