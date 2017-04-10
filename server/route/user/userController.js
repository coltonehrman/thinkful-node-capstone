const User = require('../../model/userModel');
const auth = require('../auth');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => next(err));
};

exports.get = (req, res, next) => {
  User.find({})
    .select('-password')
    .exec()
    .then((users) => {
      res.json(users.map(user => user.toJson()));
    })
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const { email, username, password } = req.body;
  const newUser = new User({
    email, username, password,
  });

  if (!email || !username || !password ||
      email.trim() === '' || username.trim() === '' || password.trim() === '') {
    return next(new Error('Missing field!'));
  }

  return User.encryptPassword(password)
    .then((hash) => {
      newUser.password = hash;
      return newUser.save();
    })
    .then((user) => {
      auth.login(user, req, res, next);
    })
    .catch(err => next(err));
};

// exports.getOne = function(req, res, next) {
//   var user = req.user.toJson();
//   res.json(user.toJson());
// };
//
// exports.put = function(req, res, next) {
//   var user = req.user;
//
//   var update = req.body;
//
//   _.merge(user, update);
//
//   user.save(function(err, saved) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(saved.toJson());
//     }
//   })
// };
//
// exports.delete = function(req, res, next) {
//   req.user.remove(function(err, removed) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(removed.toJson());
//     }
//   });
// };

exports.me = (req, res) => {
  res.json(req.user.toJson());
};
