"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

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
import { FaChevronRight } from "react-icons/fa6";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="rounded-lg bg-white shadow-sm w-10/12 lg:w-10/12 xl:w-6/12 max-w-[400px] border">
      <div className="p-6">
        <div className="mb-6 text-primary font-semibold text-xl">Evento</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
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
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2" />
              Login with Google
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>

      <div className="border-t h-16 flex items-center relative mt-12 p-6">
        <div className="absolute -top-3 bg-white left-4 px-2 font-medium">
          Or sign in as
        </div>
        <Link href="">
          <Button variant="ghost" className="hover:bg-inherit pl-0">
            Event Manager
            <FaChevronRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
