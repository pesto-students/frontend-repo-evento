"use client";

import Stepper from "@/components/Manager/CreateEvents/Stepper";
import EventDetailsForm from "@/components/Manager/CreateEvents/Forms/EventDetailsForm";

const Page = () => {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="ml-4 col-span-2">
        <Stepper />
      </div>
      <div className="col-span-4 text-gray-500">
        <EventDetailsForm />
      </div>
    </div>
  );
};

export default Page;
