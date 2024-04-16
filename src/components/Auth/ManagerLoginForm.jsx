"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginForm = ({ setCurrentView }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      //   const res = await signIn("credentials", {
      //     redirect: false,
      //     email: values.email,
      //     password: values.password,
      //   });
      //   console.log(res);
      //   router.push("/manager");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-lg bg-white shadow-sm w-10/12 lg:w-10/12 xl:w-6/12 max-w-[400px] border">
      <div className="p-6">
        <div className="mb-6 text-primary font-semibold text-xl">
          Evento Business
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter your email to continue</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your email here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter the password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your password here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Create now!
          </Link>
        </div>
      </div>

      <div className="border-t h-16 flex items-center relative mt-12 p-6">
        <div className="absolute -top-3 bg-white left-4 px-2 font-medium">
          Or sign in as
        </div>

        <Button
          onClick={() => setCurrentView("user")}
          variant="ghost"
          className="hover:bg-inherit pl-0"
        >
          User
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
