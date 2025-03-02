const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const User = require('../../src/models/user.model');
const getFullName = require('../../src/utils/fullName');

const password = 'pass';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const createUser = (role = 'user') => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    _id: mongoose.Types.ObjectId(),
    firstName,
    lastName,
    fullName: getFullName({ firstName, lastName }),
    email: faker.internet.email().toLowerCase(),
    password: password,
    role,
    isEmailVerified: false,
  };
};

const userOne = createUser();
const userTwo = createUser();
const admin = createUser('admin');

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
