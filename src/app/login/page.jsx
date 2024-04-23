import React from "react";
import { Park } from "@/components/others/Illustrations";
import AuthView from "@/components/auth/AuthView";

const Page = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="hidden lg:flex bg-muted/50 flex-col gap-6 justify-center items-center">
        <div className="h-[400px] w-full p-12">
          <Park className="w-full" />
        </div>
        <div className="py-12 px-12 text-gray-700">
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
        <AuthView/>
      </div>
    </main>
  );
};

export default Page;
