import db from '../models/indexModel.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// function generateAccessToken(username) {
//   return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
// }

const User = db.users;

const authenticateUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    where: { email: email },
  });
  if (!user) {
    console.log('User not found!');
    return res.status(404).send('User not found!');
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send('Password is not valid!');
  }
  if (user && user.deletedAt !== null) {
    return res.status(404).send('User not found because he was deleted contact the support!');
  }
  delete user.dataValues.password;
  res.status(200).send(user);
  //   const token = generateAccessToken({ email: req.body.email });
  //   res.status(200).send(token);
};

export default {
  authenticateUser,
};
