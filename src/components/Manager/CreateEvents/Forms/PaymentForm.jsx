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
        <Card className="shadow w-[280px]">
          <h2 className="font-semibold text-2xl text-gray-500">Basic</h2>
          <div className="mt-6 max-w-fit">
            {lists.map((item, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
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

                <div className="flex-1">{item.title}</div>
              </div>
            ))}
          </div>
          <div className="text-xl font-medium mt-6 text-primary">Rs 299</div>
          <div className="mt-6">
            <Button type="primary" block>
              Select Plan
            </Button>
          </div>
        </Card>
        <Badge.Ribbon text="Recommended" color="red">
          <Card className="shadow w-[280px]">
            <h2 className="font-semibold text-2xl text-gray-500">Premium</h2>
            <div className="mt-6 max-w-fit">
              {lists.map((item, i) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <div className="bg-green-500 rounded-full flex items-center justify-center w-4 h-4">
                    <Check className="stroke-white w-3 h-3" />
                  </div>
                  <div className="flex-1">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="text-xl font-medium mt-6 text-primary">Rs 499</div>
            <div className="mt-6">
              <Button type="primary" block>
                Select Plan
              </Button>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
    </>
  );
};

export default PaymentForm;
