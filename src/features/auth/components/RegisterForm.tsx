"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterInput } from "../schemas/register-schema";

import { registerUser } from "../actions/register";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  const [message, setMessage] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    setMessage("");

    const result = await registerUser(values);

    if (result.error) {
      setMessage(result.error);
    }

    if (result.success) {
      setMessage("Account created successfully");

      form.reset();
    }
  }

return (
  <Card className="w-[400px]">
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
    </CardHeader>

    <CardContent>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          placeholder="Name"
          {...form.register("name")}
        />

        <Input
          placeholder="Email"
          {...form.register("email")}
        />

        <Input
          placeholder="Password"
          type="password"
          {...form.register("password")}
        />

        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>

      {message && (
        <p className="mt-4 text-sm">
          {message}
        </p>
      )}
    </CardContent>
  </Card>
);
}