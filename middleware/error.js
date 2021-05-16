const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
  };

  error.message = err.message;

  console.log(err);

  //Invalid ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  //Duplicate Key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((errr) => {
      return {
        field: errr.path,
        message: errr.message,
      };
    });

    error = new ErrorResponse(null, 400, message);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.messageWithField || error.message || "Server Error",
  });
};

module.exports = errorHandler;
