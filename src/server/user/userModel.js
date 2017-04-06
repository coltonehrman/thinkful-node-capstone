const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(plainTextPassword) {
    return new Promise((resolve, reject) => {
      if (!plainTextPassword) {
        return reject('');
      }
      return bcrypt.genSaltSync(10)
        .then((err, salt) => {
          if (err) {
            return reject(err);
          }
          return bcrypt.hash(plainTextPassword, salt);
        })
        .then((err, hash) => {
          if (err) {
            return reject(err);
          }
          return resolve(hash);
        });
    });
  },
  toJson() {
    const usr = this.toObject();
    delete usr.password;
    return usr;
  },
};


module.exports = mongoose.model('user', UserSchema);
