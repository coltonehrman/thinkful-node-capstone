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

UserSchema.statics = {
  encryptPassword(plainTextPassword) {
    return new Promise((resolve, reject) => {
      if (!plainTextPassword) {
        return reject('');
      }
      return bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(err);
        }
        return bcrypt.hash(plainTextPassword, salt, (err, hash) => { // eslint-disable-line
          if (err) {
            return reject(err);
          }
          return resolve(hash);
        });
      });
    });
  },
};

UserSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
  },
  toJson() {
    const usr = this.toObject();
    delete usr.password;
    return usr;
  },
};


module.exports = mongoose.model('user', UserSchema);
