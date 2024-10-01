"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt, type UserJwtPayload } from "@/lib/user-jwt";

export async function createSession(data: {
  accessToken: string;
  user: UserJwtPayload;
}) {
  // Set the session expiration time
  const expiresAt = new Date(data.user.exp * 1000);
  cookies().set("session", data.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionAPIAccessToken() {
  const accessToken = cookies().get("session")?.value;
  return { accessToken };
}

export async function getSessionUser() {
  const accessToken = cookies().get("session")?.value;
  if (!accessToken) return { user: undefined };
  const { data: user, error } = decodeJwt(accessToken);
  if (error ?? !user) {
    return { user: undefined };
  }
  return {
    user,
  };
}

export async function verifySession() {
  const accessToken = cookies().get("session")?.value;

  if (!accessToken) {
    redirect("/auth/login");
  }

  const { data: user, error } = decodeJwt(accessToken);
  if (error ?? !user) {
    redirect("/auth/login");
  }

  return {
    isLoggedIn: true,
    user,
    accessToken,
  };
}

export async function deleteSession() {
  cookies().delete("session");
  redirect("/auth/login");
}
