"use client";
import { appConfig } from "@/consts/app-config";
import { loginRequest } from "@/requests/auth.request";
import { localAuthService } from "@/services/auth/local-auth";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import Spinning from "@/shared/components/ui/spinning";
import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
type LoginFormProps = {
  defaultEmail?: string;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(18),
});

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: props.defaultEmail,
      password: "",
    },
  });
  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      setLoading(true);
      const result = await loginRequest(values);
      if (result.data.data.accessToken) {
        toast({
          title: "Login successfully",
          description: "You will be moved to your wishlist",
        });
        localAuthService.accessToken = result.data.data.accessToken;
        router.push(`${appConfig.wishlistPage}`);
      }
    } catch (error: any) {
      toast({
        title: "Got an error when login",
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
        <h3 className="font-semibold uppercase text-center">Login to your wishlist</h3>
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

        <Button disabled={isLoading}>{isLoading ? <Spinning /> : "Submit"}</Button>
        <Link className="text-right underline" href={appConfig.registerPage}>
          Click here to register
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
