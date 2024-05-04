import {
  ErrorProps,
  SuccessProps,
  ValidateProps,
} from "../interface/I_Response";

const success = ({
  status = 200,
  data = null,
  messages = [],
}: SuccessProps) => {
  return {
    status,
    data,
    messages,
  };
};

const error = ({ status = 500, data = null, messages }: ErrorProps) => {
  const HTTP_CODES = [200, 201, 400, 401, 403, 422, 500];

  return {
    status: HTTP_CODES.find((code) => code === status),
    data,
    messages,
  };
};

const validateError = ({
  status = 401,
  data = null,
  messages,
}: ValidateProps) => {
  return {
    status,
    data,
    messages,
  };
};

export { success, error, validateError };
