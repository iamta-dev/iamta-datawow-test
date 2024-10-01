export type ActionStatus = "default" | "loading" | "error" | "success";

export type ActionResultState<T> =
  | {
      result?: T;
      message?: string;
      status?: ActionStatus;
    }
  | undefined;