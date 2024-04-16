"use client";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import clsx from "clsx";
import { Check } from "lucide-react";
import React from "react";

const Stepper = () => {
  const { steps, activeStep, setActiveStep } = useCreateEventContext();
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 ">
      {steps.map((step, i) => {
        return (
          <li
            key={i}
            className="mb-10 ms-6 cursor-pointer"
            onClick={() => setActiveStep(i + 1)}
          >
            <span
              className={clsx(
                "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white",
                {
                  "bg-green-200": step.isComplete,
                  "bg-gray-100": !step.isComplete,
                  "bg-blue-100": activeStep === i + 1,
                }
              )}
            >
              {step.isComplete ? (
                <Check
                  className={clsx("w-3.5", {
                    "text-blue-500": activeStep == i + 1,
                    "text-green-500": activeStep !== i + 1,
                  })}
                />
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
