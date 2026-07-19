const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("名前を入力してください。")
    .isLength({ max: 30 })
    .withMessage("名前は30文字以内です。"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("メールアドレスを入力してください。")
    .isEmail()
    .withMessage("メールアドレスの形式が正しくありません。")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("パスワードを入力してください。")
    .isLength({ min: 4 })
    .withMessage("パスワードは4文字以上です。"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("メールアドレスを入力してください。")
    .isEmail()
    .withMessage("メールアドレスの形式が正しくありません。")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("パスワードを入力してください。"),
];

module.exports = { registerValidator, loginValidator };
