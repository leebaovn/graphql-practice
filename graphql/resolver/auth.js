const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../../models/user');

const { transformUser } = require('./merge');

module.exports = { //Resolver
  users: async () => {
    try {
      const users = await User.find()
      return users.map(user => {
        return transformUser(user);
      })
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ userInput }) => {
    try {
      const userNew = await User.findOne({ email: userInput.email })
      if (userNew) {
        throw new Error("User already exist.");
      }
      const hashedPwd = await bcrypt.hash(userInput.password, 12); // return hashedPwd
      const user = new User({
        email: userInput.email,
        password: hashedPwd
      });
      const result = await user.save();//Save data
      return { ...result._doc, _id: result.id, password: null }
    } catch (err) { throw err };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = await jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      `${process.env.secretKey}`,
      {
        expiresIn: "1h"
      })
    return { userId: user.id, token, tokenExpiration: 1 }
  }
}