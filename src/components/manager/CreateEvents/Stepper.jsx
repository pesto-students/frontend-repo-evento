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
                  "bg-red-500": step.isComplete,
                  "bg-red-100": activeStep === step.id && !step.isComplete,
                  "bg-gray-100": !step.isComplete && activeStep !== step.id,
                }
              )}
            >
              {step.isComplete ? (
                <Check className={clsx("w-3.5 text-white")} />
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
