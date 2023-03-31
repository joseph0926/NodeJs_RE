import CustomAPIError from "./custom-api.js";
import UnauthenticatedError from "./unauthenticated.js";
import NotFoundError from "./not-found.js";
import BadRequestError from "./bad-request.js";

const errorHandler = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};

export default errorHandler;
