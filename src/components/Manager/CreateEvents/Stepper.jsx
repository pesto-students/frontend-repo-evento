import clsx from "clsx";
import { Check, Ticket, MapPinned, Image as ImageIcon } from "lucide-react";
import React from "react";

const Stepper = () => {
  const steps = [
    {
      title: "Event info",
      description: "Title, Category & Description",
      isComplete: true,
      icon: <Ticket />,
    },
    {
      title: "Banners",
      description: "Event thumbnail & banner",
      isComplete: false,
      icon: <ImageIcon className="w-3.5 text-gray-500" />,
    },
    {
      title: "Venue & Time",
      description: "Event venue & date",
      isComplete: false,
      icon: <MapPinned className="w-3.5 text-gray-500" />,
    },
  ];
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 ">
      {steps.map((step, i) => {
        return (
          <li key={i} className="mb-10 ms-6">
            <span
              className={clsx(
                "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white",
                {
                  "bg-green-200": step.isComplete,
                  "bg-gray-100": !step.isComplete,
                }
              )}
            >
              {step.isComplete ? (
                <Check className="w-3.5 text-green-500" />
              ) : (
                step.icon
              )}
            </span>
            <h3 className="font-medium leading-tight">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
