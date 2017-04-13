/* eslint no-underscore-dangle: 0 */
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
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.statics = {
  encryptPassword(plainTextPassword) {
    return new Promise((resolve, reject) => {
      if (!plainTextPassword) {
        return reject('');
      }
      return bcrypt.genSalt(10, (saltErr, salt) => {
        if (saltErr) {
          return reject(saltErr);
        }
        return bcrypt.hash(plainTextPassword, salt, (hashErr, hash) => {
          if (hashErr) {
            return reject(hashErr);
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
    const user = this.toObject();
    user.id = this._id;
    delete user.password;
    delete user._id;
    return user;
  },
};


module.exports = mongoose.model('user', UserSchema);
