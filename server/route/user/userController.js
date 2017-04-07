const User = require('./userModel');

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
exports.post = (req, res, next) => {
  const { email, username, password } = req.body;
  const newUser = new User({
    email, username, password,
  });

  if (!email || !username || !password ||
      email.trim() === '' || username.trim() === '' || password.trim() === '') {
    return next(new Error('Missing field!'));
  }

  User.encryptPassword(password)
    .then((hash) => {
      newUser.password = hash;
      return newUser.save();
    })
    .then((user) => {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        // from where user came
        return res.redirect('/');
      });
    })
    .catch(err => next(err));
};

// exports.login = (req, res, next) => {
//   const { username, password } = req.body;
//   User.find({ username })
//     .select('-password')
//     .exec()
//     .then((user) => {
//       if (!user) {
//         return next('Invalid username!');
//       }
//       return res.redirect('/dashboard');
//     });
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
//
// exports.me = function(req, res) {
//   res.json(req.user.toJson());
// };
