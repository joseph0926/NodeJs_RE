const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("테스트 유저는 활동이 제한되어있습니다.");
  }
  next();
};

module.exports = testUser;
