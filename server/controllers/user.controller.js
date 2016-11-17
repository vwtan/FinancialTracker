import bcrypt from 'bcrypt-nodejs';
import User from '../models/user';

export function getUser(req, res) {
  User.findOne({ username: req.params.username }).then((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

export function createUser(req, res) {
  const passwd = bcrypt.hashSync(req.params.password, bcrypt.genSaltSync(8), null);
  User.create({ username: req.params.username, password: passwd }).then((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}
