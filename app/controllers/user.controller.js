const UserDao = require("../services/user-dao");
const bcrypt = require("bcrypt");

exports.userProfile = async (req, res) => {
  try {
    const user = await UserDao.findById(req.params.id);
    res.send(user);
  } catch (e) {
    console.log(`Something went wrong`, e.message);
    res.status(500).send(e.message);
  }
};

exports.edit = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = req.body;

    // Trying to handle the empty values coming from the client..
    if (!user.password || user.password === "") delete user.password;
    else user.password = bcrypt.hashSync(user.password, 10);

    const { nModified } = await UserDao.updateOne({ ...user, _id });
    res.send({ modified: nModified });
  } catch (e) {
    console.log(`Something went wrong`, e.message);
    res.status(500).send(e.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await UserDao.delete({ _id, _id });
    res.status(200).send(user);
  } catch (e) {
    console.log(`Something went wrong`, e.message);
    res.status(500).send(e.message);
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await UserDao.findAll();
    res.send(users);
  } catch (e) {
    console.log(`Something went wrong`, e.message);
    res.status(500).send(e.message);
  }
};

exports.createUser = async (req, res) => {
  const user = await UserDao.create(req.body);
  res.send(user._id);
};

exports.editRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await UserDao.editUserRole(id, role);
    res.send();
  } catch (e) {
    console.log(`Something went wrong`, e.message);
    res.status(500).send(e.message);
  }
};
