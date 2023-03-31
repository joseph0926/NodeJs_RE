const asyncWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
};

export default asyncWrapper;
