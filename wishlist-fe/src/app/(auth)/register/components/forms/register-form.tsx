"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Spinning from "@/shared/components/ui/spinning";
import { registerRequest } from "@/requests/auth.request";
import { useToast } from "@/shared/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { appConfig } from "@/consts/app-config";
import Link from "next/link";
import { cn } from "@/shared/utils/string";
//ref: https://www.youtube.com/watch?v=oGq9o2BxlaI&ab_channel=WebDevEducation

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(18),
    confirmPassword: z.string(),
    fullName: z.string().min(3).max(100),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

const RegisterForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      setLoading(true);
      const result = await registerRequest(values);
      if (result.data.data.fullName) {
        toast({
          title: "Registered successfully",
          description: "Please login with your email and password.",
        });
        router.push(`${appConfig.loginPage}?email=${result.data.data.email}`);
      }
    } catch (error: any) {
      toast({
        title: "Got an error when registering",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <h3 className="font-semibold uppercase text-center">Register Your Account</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email address" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Confirm Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Full Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={isLoading}>{isLoading ? <Spinning /> : "Submit"}</Button>
        <Link
          className={cn("text-right underline", isLoading ? "invisible" : "")}
          href={appConfig.loginPage}
        >
          Click here to login
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
