/* eslint-disable @next/next/no-img-element */
"use client";
import { useFormState } from "react-dom";
import { loginAction } from "../../../actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, undefined);

  return (
    <div className="flex h-screen flex-col bg-green-500 md:flex-row">
      {/* Right Side: a Board (Desktop) / Top (Mobile) */}
      <div className="order-first flex h-2/5 w-full items-center justify-center rounded-b-[2rem] bg-green-300 md:order-last md:h-auto md:w-2/5 md:rounded-l-[2rem]">
        <div className="flex flex-col items-center">
          <img
            src="/images/board.png"
            alt="Board Image"
            className="mb-4 h-32 w-32 md:h-40 md:w-40"
          />
          <h1 className="text-2xl italic text-white">a Board</h1>
        </div>
      </div>

      {/* Left Side: Sign-in (Desktop) / Bottom (Mobile) */}
      <div className="order-last flex h-3/5 w-full items-center justify-center bg-green-500 md:order-first md:h-auto md:w-3/5">
        <div className="flex w-11/12 max-w-sm flex-col justify-center sm:w-4/5">
          <h1 className="mb-6 text-3xl font-semibold text-white">Sign in</h1>
          <form className="space-y-4" action={action}>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full"
            />
            {state?.errors?.username && (
              <p className="mb-2 text-sm text-destructive">
                {state.errors.username}
              </p>
            )}
            {state?.message && (
              <p className="mt-5 text-sm text-destructive">{state.message}</p>
            )}
            <Button className="w-full font-semibold">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
