const User = require("../db/models/user");

exports.userController = async (req, res) => {
  const users = await User.find({});
  return res.json(users);
};
