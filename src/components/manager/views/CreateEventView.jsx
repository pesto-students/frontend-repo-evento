"use client";

import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import React from "react";
import Stepper from "../CreateEvents/Stepper";
import EventDetailsForm from "../CreateEvents/Forms/EventDetailsForm";
import BannersForm from "../CreateEvents/Forms/BannersForm";
import VenueForm from "../CreateEvents/Forms/VenueForm";
import HostInfoForm from "../CreateEvents/Forms/HostInfoForm";
import PaymentForm from "../CreateEvents/Forms/PaymentForm";

const CreateEventView = () => {
  const { activeStep } = useCreateEventContext();
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="ml-4 col-span-2">
        <Stepper />
      </div>
      <div className="col-span-4 text-gray-500">
        {activeStep === 1 && <EventDetailsForm />}
        {activeStep === 2 && <BannersForm />}
        {activeStep === 3 && <VenueForm />}
        {activeStep === 4 && <HostInfoForm />}
        {activeStep === 5 && <PaymentForm />}
      </div>
    </div>
  );
};

export default CreateEventView;
