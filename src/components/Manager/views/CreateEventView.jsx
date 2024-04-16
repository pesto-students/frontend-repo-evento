"use client";

import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import React from "react";
import Stepper from "../CreateEvents/Stepper";
import EventDetailsForm from "../CreateEvents/Forms/EventDetailsForm";

const CreateEventView = () => {
  const { activeStep } = useCreateEventContext();
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="ml-4 col-span-2">
        <Stepper />
      </div>
      <div className="col-span-4 text-gray-500">
        {activeStep === 1 && <EventDetailsForm />}
      </div>
    </div>
  );
};

export default CreateEventView;
