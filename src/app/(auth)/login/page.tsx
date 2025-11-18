"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./action";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, {
    fieldErrors: {},
    error: "",
  });

  // 🔁 redirect otomatis setelah login
  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully logged in.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.replace("/dashboard");
      });
    }

    if (state?.error) {
      Swal.fire({
        title: "Error!",
        text: state.error,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [state, router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <div className="bg-white/10 backdrop-blur-xs shadow-md rounded-xl mx-auto py-12 px-6 w-full max-w-lg z-10 border-2 border-white/20">
        <div className="flex flex-col items-center justify-center mb-10 gap-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={100}
            loading="lazy"
          />
          <h1 className="text-5xl font-black text-center text-white ">
            Log In
          </h1>
        </div>
        <form action={formAction} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label className="text-xl font-bold text-white">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
            />
            {state.fieldErrors?.email && (
              <p className="text-red-800 text-sm mt-1">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xl font-bold text-white">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
            />
            {state.fieldErrors?.password && (
              <p className="text-red-800 text-sm mt-1">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="defaultHome"
            className="w-full h-12 text-xl font-black mt-3"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="size-6" />
                <p>Loading...</p>
              </div>
            ) : (
              "Log In"
            )}
          </Button>

          <div className="text-white flex justify-center gap-1 mt-4 font-bold">
            <p>If you don&apos;t have an account, please</p>{" "}
            <Link href="/register" className="underline text-orange-300">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
