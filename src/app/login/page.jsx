import LoginForm from "@/components/Auth/LoginForm";
import React from "react";

const Page = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="hidden lg:flex bg-gray-100 flex-col justify-between items-center">
        <div className="h-[400px]"></div>
        <div className="py-12 px-12">
          <div className="text-4xl font-semibold">
            There&apos;s a smarter way to explore events around you!
          </div>
          <div className="text-2xl font-medium mt-10">
            Signup now to explore with{" "}
            <span className="text-primary">Evento!</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 py-6 flex justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
