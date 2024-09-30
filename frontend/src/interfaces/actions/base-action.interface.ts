export type ActionResultState<T> =
  | {
      result?: T;
      message?: string;
      status?: 'default' | 'loading' | 'error' | 'success';
    }
  | undefined;
