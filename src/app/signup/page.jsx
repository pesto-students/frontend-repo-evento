import React from "react";
import { Park } from "@/components/others/Illustrations";
import SignupForm from "@/components/auth/SignupForm";

const Page = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="hidden lg:flex bg-muted/50 flex-col gap-6 justify-center items-center">
        <div className="w-full flex justify-center">
          <Park className="w-9/12" />
        </div>
        <div className="py-0 px-12 text-gray-700">
          <div className="text-4xl font-semibold text-center">
            There&apos;s a smarter way to explore events around you!
          </div>
          <div className="text-2xl font-medium mt-10 text-center">
            Signup now to explore with{" "}
            <span className="text-primary font-semibold">Evento!</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 py-6 flex justify-center items-center">
        <SignupForm />
      </div>
    </main>
  );
};

export default Page;