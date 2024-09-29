/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type UserJwtPayload } from "@/lib/user-jwt";

export type getProfile = () => Promise<UserJwtPayload | null>;
