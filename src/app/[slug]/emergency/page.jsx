import { Siren } from "lucide-react";
import React from "react";

const EmergencyInfo = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex gap-2 items-center">
        <Siren className="text-primary w-5 -mt-1" />
        <h2 className="text-lg font-semibold text-content uppercase">
          Emergency
        </h2>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div>
          <h5 className="font-semibold">Police</h5>
          <div>Chandmari Police Station, Ph - 8888888888, 7878787878</div>
        </div>
        <div>
          <h5 className="font-semibold">Event Security</h5>
          <div>Ph - 8888888888, 7878787878</div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyInfo;
