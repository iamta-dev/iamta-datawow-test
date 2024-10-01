"use server";

import { cache } from "react";
import { getSessionUser } from "@/actions/session.action";
import { type UserJwtPayload } from "@/lib/user-jwt";

export const getProfileAction = cache(
  async (): Promise<UserJwtPayload | null> => {
    try {
      const session = await getSessionUser();
      return session.user ?? null;
    } catch (error) {
      return null;
    }
  },
);
