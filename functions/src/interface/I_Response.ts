type ResponseProps<T> = {
  status?: number;
  data?: T;
  messages?: string[];
};

export type SuccessProps = ResponseProps<any>;
export type ErrorProps = ResponseProps<any>;
export type ValidateProps = ResponseProps<null>;
