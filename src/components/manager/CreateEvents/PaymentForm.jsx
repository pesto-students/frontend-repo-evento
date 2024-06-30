import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import Axios from "@/lib/Axios";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { createEventSchema } from "@/validationSchemas";
import { Badge, Button, Card, message } from "antd";
import { useFormik } from "formik";
import { Check, X } from "lucide-react";
import React from "react";
import { loadStripe } from "@stripe/stripe-js/pure";

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

  const formik = useFormik({
    initialValues: {
      title: event?.title || "",
      categories: event?.categories,
      description: event?.description,
      thumbnailUrl: event?.thumbnailUrl,
      bannerUrl: event?.bannerUrl,
      videoUrl: event?.videoUrl,
      venue: event?.venue,
      startDate: event?.startDate,
      endDate: event?.endDate,
      entryFee: event?.entryFee,
      latitude: event?.latitude,
      longitude: event?.longitude,
      organizerName: event?.organizerName,
      organizerEmail: event?.organizerEmail,
      organizerPhone: event?.organizerPhone,
      plan: "BASIC",
    },
    validationSchema: createEventSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await Axios.post(`/events`, values);

        const stripe = await loadStripe(
          "pk_test_51PQkOWSFh6CHFK6iw1xoOXpLj32MUXucdmYART6OTgYvKF50mQvgrdaVOWpmGXrguXwx2y68cUd5UiTMwORJnLGK00DAGsC3Ng"
        );
        const body = res.data.data.event;

        const checkoutRes = await Axios.post(`/events/checkout-session`, body);

        stripe.redirectToCheckout({
          sessionId: checkoutRes.data.session.id,
        });
      } catch (error) {
        message.error(error.message || DEFAULT_ERROR_MESSAGE);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleBuyClick = async (plan) => {
    formik.setFieldValue("plan", plan);
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        const firstErrorField = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorField];
        message.error(firstErrorMessage);
      } else {
        formik.handleSubmit();
      }
    });
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
                  disabled={formik.isSubmitting}
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
                The Premium plan is the perfect starting point for new users.
                Join now to get a taste of all the features &amp; benefits that
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
                  <Button
                    block
                    type="primary"
                    disabled={formik.isSubmitting}
                    onClick={() => handleBuyClick("PREMIUM")}
                  >
                    BUY NOW
                  </Button>
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
