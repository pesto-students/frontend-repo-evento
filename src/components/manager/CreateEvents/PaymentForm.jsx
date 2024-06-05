import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import { Alert, Badge, Button, Card, Modal, Spin } from "antd";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

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
  const { event } = useCreateEventContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = async (plan) => {
    setIsModalOpen(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(event);
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="text-xs">Step 4 of 5</div>
      <div className="text-lg font-semibold">Select Package</div>
      <div className="mt-12 grid grid-cols-2 gap-6">
        <Card>
          <div>
            <h3
              id="tier-basic"
              className="text-lg font-semibold leading-8 tracking-tight text-primary"
            >
              Basic
            </h3>
            <div className="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-900">
              <span> Rs 499 </span>
            </div>
            <p className="mt-6 text-xs leading-2 text-gray-600 dark:text-slate-200">
              The Basic plan is the perfect starting point for new users. Join
              now to get a taste of all the features &amp; benefits that Subtxt
              has to offer.
            </p>
          </div>
          <div className="flex flex-1 flex-col mt-3">
            <div className="flex flex-1 flex-col justify-between rounded-lg bg-gray-50 p-3">
              <ul role="list" className="space-y-3">
                {lists.map((item, i) => (
                  <li key={i} className="flex items-center">
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

                    <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  block
                  type="primary"
                  onClick={() => handleBuyClick("BASIC")}
                >
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Badge.Ribbon text="Recommended" color="green">
          <Card>
            <div>
              <h3
                id="tier-basic"
                className="text-lg font-semibold leading-8 tracking-tight text-primary"
              >
                Premium
              </h3>
              <div className="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-900">
                <span> Rs 999 </span>
              </div>
              <p className="mt-6 text-xs leading-2 text-gray-600 dark:text-slate-200">
                The Basic plan is the perfect starting point for new users. Join
                now to get a taste of all the features &amp; benefits that
                Subtxt has to offer.
              </p>
            </div>
            <div className="flex flex-1 flex-col mt-3">
              <div className="flex flex-1 flex-col justify-between rounded-lg bg-gray-50 p-3">
                <ul role="list" className="space-y-3">
                  {lists.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="bg-green-500 rounded-full flex items-center justify-center w-4 h-4">
                        <Check className="stroke-white w-3 h-3" />
                      </div>

                      <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {item.title}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button block type="primary">
                    BUY NOW
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>

      <Modal
        title={null}
        open={isModalOpen}
        centered
        closable={false}
        footer={null}
      >
        <div className="flex flex-col py-6 gap-3 items-center justify-center">
          <Spin spinning={true} />
          <p className="font-medium text-center">
            Please wait we are saving data...
          </p>
        </div>
      </Modal>
    </>
  );
};

export default PaymentForm;
