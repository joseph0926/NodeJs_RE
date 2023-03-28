import { CustomAPIError } from "../error/custom-error";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "에러가 발생하였습니다,, 다시 시도해주세요." });
};

export default errorHandler;
