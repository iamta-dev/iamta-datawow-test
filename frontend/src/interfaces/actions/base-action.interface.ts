export enum ActionStatusEnum {
  default,
  loading,
  error,
  success,
}

export type ActionResultState<T> =
  | {
      result?: T;
      message?: string;
      status?: ActionStatusEnum;
    }
  | undefined;
