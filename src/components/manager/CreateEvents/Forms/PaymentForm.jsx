import { Badge, Button, Card } from "antd";
import { Check, X } from "lucide-react";
import React from "react";

const lists = [
  {
    id: 5,
    title: "Itinerary",
  },
  {
    id: 6,
    title: "Instructions",
  },
  {
    id: 7,
    title: "Sponsors",
  },
  {
    id: 8,
    title: "Event Map",
  },
  {
    id: 9,
    title: "Lost & Found",
  },
  {
    id: 11,
    title: "Reviews",
  },
  {
    id: 12,
    title: "Analytics",
  },
];

const PaymentForm = () => {
  return (
    <>
      <div className="text-xs">Step 4 of 5</div>
      <div className="text-lg font-semibold">Select Package</div>
      <div className="mt-12 flex gap-6">
        <Card className=" max-w-[320px]">
          <div>
            <h3
              id="tier-basic"
              class="text-lg font-semibold leading-8 tracking-tight text-primary"
            >
              Basic
            </h3>
            <div class="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-900">
              <span> $25 </span>
            </div>
            <p class="mt-6 text-xs leading-2 text-gray-600 dark:text-slate-200">
              The Basic plan is the perfect starting point for new users. Join
              now to get a taste of all the features &amp; benefits that Subtxt
              has to offer.
            </p>
          </div>
          <div class="flex flex-1 flex-col mt-3">
            <div class="flex flex-1 flex-col justify-between rounded-lg bg-gray-50 p-3">
              <ul role="list" class="space-y-3">
                {lists.map((item, i) => (
                  <li key={i} class="flex items-center">
                    {i < 4 ? (
                      <div className="bg-green-500 rounded-full flex items-center justify-center w-4 h-4">
                        <Check className="stroke-white w-3 h-3" />
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-500 rounded-full flex items-center justify-center w-4 h-4">
                          <X className="stroke-white w-3 h-3" />
                        </div>
                      </>
                    )}

                    <p class="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
              <div class="mt-8">
                <Button block> BUY NOW</Button>
              </div>
            </div>
          </div>
        </Card>

        <Badge.Ribbon text="Recommended" color="red">
          <Card className=" max-w-[320px]">
            <div>
              <h3
                id="tier-basic"
                class="text-lg font-semibold leading-8 tracking-tight text-primary"
              >
                Premium
              </h3>
              <div class="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-900">
                <span> $50 </span>
              </div>
              <p class="mt-6 text-xs leading-2 text-gray-600 dark:text-slate-200">
                The Basic plan is the perfect starting point for new users. Join
                now to get a taste of all the features &amp; benefits that
                Subtxt has to offer.
              </p>
            </div>
            <div class="flex flex-1 flex-col mt-3">
              <div class="flex flex-1 flex-col justify-between rounded-lg bg-gray-50 p-3">
                <ul role="list" class="space-y-3">
                  {lists.map((item, i) => (
                    <li key={i} class="flex items-center">
                      <div className="bg-green-500 rounded-full flex items-center justify-center w-4 h-4">
                        <Check className="stroke-white w-3 h-3" />
                      </div>

                      <p class="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {item.title}
                      </p>
                    </li>
                  ))}
                </ul>
                <div class="mt-8">
                  <Button block> BUY NOW</Button>
                </div>
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
    </>
  );
};

export default PaymentForm;
