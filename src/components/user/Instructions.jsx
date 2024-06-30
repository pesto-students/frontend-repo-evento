import { ListCollapse } from "lucide-react";
import React from "react";

const Instructions = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex gap-2 items-center">
        <ListCollapse className="text-primary" />
        <h2 className="text-lg font-semibold text-content uppercase">
          Instructions
        </h2>
      </div>
      <div className="mt-6">
        <ul className="space-y-1 list-disc list-inside">
          <li>Please carry a valid ID proof along with you. </li>
          <li>
            No refunds on purchased ticket are possible, even in case of any
            rescheduling.
          </li>
          <li>
            Security procedures, including frisking remain the right of the
            management.
          </li>
          <li>
            No dangerous or potentially hazardous objects including but not
            limited to weapons, knives, guns, fireworks, helmets, lazer devices,
            bottles, musical instruments will be allowed in the venue and may be
            ejected with or without the owner from the venue.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Instructions;
