import prisma from "../db";

export const getAllUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  res.status(201).json({
    message: "모든 업데이트를 성공적으로 불러왔습니다.",
    data: updates,
  });
};

export const getUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.status(201).json({
    message: "해당 업데이트를 성공적으로 불러왔습니다.",
    data: update,
  });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    res.status(401).json({ message: "제품을 불러오는데 실패하였습니다,,," });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });
  res.status(201).json({
    message: "해당 업데이트를 성공적으로 생성하였습니다.",
    data: update,
  });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.status(401).json({ message: "제품을 불러오는데 실패하였습니다,,," });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.status(201).json({
    message: "해당 업데이트를 성공적으로 업데이트하였습니다.",
    data: updatedUpdate,
  });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.status(401).json({ message: "제품을 불러오는데 실패하였습니다,,," });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).json({
    message: "해당 업데이트를 성공적으로 삭제하였습니다.",
    data: deletedUpdate,
  });
};
