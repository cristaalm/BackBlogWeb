const AsyncHandler = require("express-async-handler");
const Users = require("../model/users");

const findAllUsers = AsyncHandler(async (req, res) => {
  let usersList = await Users.findAll();
  res.status(200).json({
    description: "Successfully fetched user data",
    data: usersList,
  });
});

const createUsers = AsyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({
      description: "Bad request username must be filled!",
    });
  }
  const users = await Users.create(users_map);
  res.status(200).json({
    description: "Successfully saved user data",
  });
});

const findUsersById = AsyncHandler(async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  res.status(200).json({
    description: "Successfully fetch by id: ${req.params.id} user data",
    data: user,
  });
});

const updateUsers = AsyncHandler(async (req, res) => {
  const user = await Users.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json({
    description: "Successfully updated user data",
  });
});

const removeUser = AsyncHandler(async (req, res) => {
  const user = await Users.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({
    description: "Successfully deleted user data",
  });
});

module.exports = { createUsers, findAllUsers,findUsersById, updateUsers, removeUser };
