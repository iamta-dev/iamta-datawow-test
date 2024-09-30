"use server";

import { cache } from "react";
import { getSessionUser } from "@/lib/session";

export const getProfileAction = cache(async () => {
  try {
    const session = await getSessionUser();
    return session.user ?? null;
  } catch (error) {
    return null;
  }
});
