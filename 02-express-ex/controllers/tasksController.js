const getAllTasks = (req, res, next) => {
  res.send("all tasks");
};

const createTask = (req, res, next) => {
  res.json(req.body);
};

const getSingleTask = (req, res, next) => {
  const id = req.params.id;
  res.json({ id });
};

const updateTask = (req, res, next) => {
  res.send("update task");
};

const deleteTask = (req, res, next) => {
  res.send("delete task");
};

export const controller = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
