import { StatusCodes } from "http-status-codes";
// import CustomAPIError from "../errors/custom-api.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "오류가 발생하였습니다, 다시 시도해주시길 바랍니다.",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.message = Object.values(err.errors)
      .map((e) => {
        return e.message;
      })
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `해당값(${Object.keys(err.keyValue)}) 은 이미 존재합니다, 다른값을 사용해주세요.`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.message = `해당 ID(${err.value}}) 의 항목이 존재하지 않습니다`;
    customError.statusCode = 404;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
