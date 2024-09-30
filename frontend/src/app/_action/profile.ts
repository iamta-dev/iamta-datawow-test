"use server";

import { cache } from "react";
import { getSessionUser } from "@/lib/session";

export const getProfileAction = cache(async () => {
  const session = await getSessionUser();
  try {
    return session.user ?? null;
  } catch (error: unknown) {
    return null;
  }
});
