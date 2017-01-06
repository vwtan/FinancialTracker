import njwt from 'njwt';
import secureRandom from 'secure-random';
import bcrypt from 'bcrypt-nodejs';
import User from '../models/user';

const key = secureRandom(256, { type: 'Buffer' });

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
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const claims = {
          iss: 'fin',
          sub: user.get('username'),
          scope: 'user',
        };
        const token = njwt.create(claims, key);
        token.setExpiration(new Date().getTime() + (5 * 60 * 1000));
        const utoken = token.compact();
        res.status(201).json({ id_token: utoken });
      } else {
        res.status(401).json({ error: 'error either in username or password' });
      }
    } else {
      res.status(401).json({ error: 'error either in username or password' });
    }
  });
}
