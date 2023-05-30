import db from '../models/indexModel.js';
import bcrypt from 'bcrypt';

const User = db.users;

const createUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const user = await User.create(req.body);
  res.status(200).send(user);
};

const getAll = async (req, res) => {
  const users = await User.findAll({
    attributes: ['first_name', 'last_name', 'email', 'createdAt', 'updatedAt'],
  });
  res.status(200).send(users);
};

const getMentor = async (req, res) => {
  const users = await User.findAll({
    where: { roles: 'Mentor' },
    attributes: { exclude: ['password'] },
  });
  res.status(200).send(users);
};

const search = async (req, res) => {
  const users = await User.findAll({
    where: {
      first_name: { [Op.like]: `%${req.params.name}%` },
    },
    order: [['createdAt', 'DESC']],
  });
  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({
    where: { id: id },
  });
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const id = req.params.id;
  await User.update({ deletedAt: new Date() }, { where: { id: id } });
  res.status(200).send('User deleted successfully!');
};

export default {
  createUser,
  getAll,
  getMentor,
  search,
  getOne,
  updateUser,
  removeUser,
};
