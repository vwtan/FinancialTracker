import bcrypt from 'bcrypt-nodejs';
import User from '../models/user';

export function getUser(req, res) {
  User.findOne({ where: { username: req.params.name } }).then((user) => {
    res.json({ username: user.get('username') });
  });
}

export function createUser(req, res) {
  const passwd = bcrypt.hashSync(req.body.info.password, bcrypt.genSaltSync(8), null);
  User.findOrCreate({ where: { username: req.body.info.username }, defaults: { password: passwd } }).spread((user, created) => {
    console.log(user.get('username'));
    console.log(created);
    res.json({ username: user.get('username') });
  });
}

export function checkUser(req, res) {
  User.findOne({ where: { username: req.body.info.username } }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.info.password, user.password)) {
        console.log('login');
        res.json({ str: 'success' });
      } else {
        console.log('failed');
        res.json({ str: 'fail' });
      }
    } else {
      console.log('user not found');
      res.json({ str: 'fail2' });
    }
  });
}
