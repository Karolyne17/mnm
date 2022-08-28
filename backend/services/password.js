const bcrypt = require("bcrypt");

const SALT_ROUNDS = 8;

exports.hashPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

exports.comparePasswords = (plainTextPassword, hash) => {
    return bcrypt.compare(plainTextPassword, hash);
}