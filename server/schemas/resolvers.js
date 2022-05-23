const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v, -password"
        );
        return userData;
      }
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
  },
  Mutation: {
    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link },
      context
    ) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: {
                savedBooks: {
                  authors,
                  description,
                  title,
                  bookId,
                  image,
                  link,
                },
              },
            }
          );
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  },
};
module.exports = resolvers;
