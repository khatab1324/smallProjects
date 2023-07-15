const { check } = require("express-validator");
const UserRepo = require("../repositories/users");

//sign-up
module.exports = {
  usernameRequire: check("username")
    .trim()
    .exists()
    .withMessage("username is require")
    .isLength({ min: 5 })
    .withMessage("must be more then 5 charcter")
    .isString()
    .withMessage("The username must be a string")
    .custom(async (username) => {
      const checkUsernameExist = await UserRepo.getOneBy({ username });
      if (checkUsernameExist) {
        throw new Error("this username is exist try another one");
      }
      return true;
    }),

  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be vaild email")
    .custom(async (email) => {
      const existingEmail = await UserRepo.getOneBy({ email });
      if (existingEmail) {
        throw new Error("the email is already exist");
      }
      return true;
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Must be between 8 to 20 characters"),

  requirePasswordConfirmatio: check("passwordConfirmation")
    .trim()
    .isLength({ min: 8, max: 20 }) //the withMessage linked with custom in express-validation
    .withMessage("password must match ^__-")
    .custom((passwordConfirmation, { req }) => {
      //I put req becuase I need password and check have just one but , this way made by express-valdi....

      if (passwordConfirmation !== req.body.password) {
        throw new Error("password must match ^__-");
      }
      return true;
    }),
  requireAge: check("age")
    .exists()
    .withMessage("you should provide your age")
    .isNumeric()
    .withMessage("should be number"),
  requireCountry: check("country")
    .trim()
    .exists()
    .withMessage("plz provide name your country")
    .isLength({ min: 2 })
    .withMessage("plz provide Full Name for your country"),
};
