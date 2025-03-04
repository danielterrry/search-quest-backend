const faker = require('faker');
const { User } = require('../../../src/models');

const generateFullName = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`;
  return { firstName, lastName, fullName };
};

describe('User validation', () => {
  let newUser;
  beforeEach(() => {
    const { firstName, lastName, fullName } = generateFullName();
    newUser = {
      firstName,
      lastName,
      fullName,
      email: faker.internet.email().toLowerCase(),
      password: 'pass',
      role: 'user',
    };
  });
});

describe('User validation', () => {
  let newUser;
  beforeEach(() => {
    const { firstName, lastName, fullName } = generateFullName();
    newUser = {
      firstName,
      lastName,
      fullName,
      email: faker.internet.email().toLowerCase(),
      password: 'pass',
      role: 'user',
    };
  });
});

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      const { firstName, lastName, fullName } = generateFullName();
      newUser = {
        firstName,
        lastName,
        fullName,
        email: faker.internet.email().toLowerCase(),
        password: 'pass',
        role: 'user',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    // test('should throw a validation error if password length is less than 8 characters', async () => {
    //   newUser.password = 'passwo1';
    //   await expect(new User(newUser).validate()).rejects.toThrow();
    // });

    // test('should throw a validation error if password does not contain numbers', async () => {
    //   newUser.password = 'password';
    //   await expect(new User(newUser).validate()).rejects.toThrow();
    // });

    // test('should throw a validation error if password does not contain letters', async () => {
    //   newUser.password = '11111111';
    //   await expect(new User(newUser).validate()).rejects.toThrow();
    // });

    test('should throw a validation error if role is unknown', async () => {
      newUser.role = 'invalid';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const { firstName, lastName, fullName } = generateFullName();
      const newUser = {
        firstName,
        lastName,
        fullName,
        email: faker.internet.email().toLowerCase(),
        password: 'pass',
        role: 'user',
      };
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});
