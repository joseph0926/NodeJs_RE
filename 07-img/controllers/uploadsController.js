const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const cloudinary = require("cloudinary").v2;

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new customError.BadRequestError("파일을 찾을 수 없습니다.");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new customError.BadRequestError("이미지를 업로드해주세요.");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new customError.BadRequestError("최대 이미지 크기는 1KB입니다");
  }

  const imagePath = path.join(__dirname, "../public/uploads" + `${productImage.name}`);
  await productImage.mv(imagePath);

  return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: "node-file-upload",
  });
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
