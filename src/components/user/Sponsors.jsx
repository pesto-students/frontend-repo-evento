import { HandCoins } from "lucide-react";
import Image from "next/image";
import React from "react";

const sponsors = [
  {
    link: "",
    image:
      "https://dp6mhagng1yw3.cloudfront.net/entries/oeW_Jt_JBL_CordFail_Banner.jpg",
  },
  {
    link: "",
    image:
      "https://i.pinimg.com/564x/90/00/5b/90005b7e1e8f97de1b41269b0932c95b.jpg",
  },
];

const Sponsors = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex gap-2 items-center">
        <HandCoins className="text-primary" />
        <h2 className="text-lg font-semibold text-content uppercase">
          Official Sponsors
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-3 lg:grid-cols-4 gap-6">
        {sponsors.map((item, i) => (
          <Image
            key={i}
            width={480}
            height={360}
            src={item.image}
            className="w-full h-full object-cover rounded-md mt-4"
            alt="Event Spotlight"
          />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
