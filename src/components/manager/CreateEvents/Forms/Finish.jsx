import { Button } from "antd";
import { CircleCheckBig } from "lucide-react";
import React from "react";

const Finish = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <CircleCheckBig className="stroke-green-600" />
        <h2 className="text-2xl">Event created successfully</h2>
        <p>You can now add more details to your event & make it live!</p>
        <Button>Go to event</Button>
      </div>
    </div>
  );
};

export default Finish;
