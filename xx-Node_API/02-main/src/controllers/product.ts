import prisma from "../db";

export const getAllProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.status(201).json({ message: "모든 제품을 성공적으로 불러왔습니다.", data: user.products });
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  });

  res.status(201).json({ message: "제품을 성공적으로 불러왔습니다.", data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.status(201).json({ message: "제품을 성공적으로 생성하였습니다.", data: product });
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: { id: productId, belongsToId: req.user.id },
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(201).json({ message: "제품을 성공적으로 업데이트하였습니다.", data: updated });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: { id: productId, belongsToId: req.user.id },
    },
  });

  res.status(201).json({ message: "제품을 성공적으로 삭제하였습니다.", data: deleted });
};
