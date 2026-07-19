const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = require("../utils/generateToken");
const cookieOptions = require("../config/cookie");
const { validationResult } = require("express-validator");

/**
 * ユーザー登録
 */
const register = async (req, res, next) => {
  try {
    // バリデーション
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "入力内容を確認してください。",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // メールアドレス重複チェック
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "メールアドレスは既に登録されています。",
      });
    }

    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // JWT生成
    const token = generateToken(user._id);

    // Cookie保存
    res.cookie("accessToken", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "ユーザー登録が完了しました。",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ログイン
 */
const login = async (req, res, next) => {
  try {
    // バリデーション
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "入力内容を確認してください。",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // ユーザー検索
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "メールアドレスが存在しません。",
      });
    }

    // パスワード確認
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "パスワードが違います。",
      });
    }

    // 最終ログイン日時更新
    user.lastLoginAt = new Date();

    await user.save();

    // JWT生成
    const token = generateToken(user._id);

    // Cookie保存
    res.cookie("accessToken", token, cookieOptions);

    // password除外
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "ログインしました。",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ログアウト
 */
const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "ログアウトしました。",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ログインユーザー取得
 */
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "プロフィール情報です。",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
