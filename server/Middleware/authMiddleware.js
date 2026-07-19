const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "認証が必要です。",
      });
    }

    // JWT検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ユーザー取得
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "ユーザーが存在しません。",
      });
    }

    // リクエストへ格納
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "認証に失敗しました。",
    });
  }
};

module.exports = authMiddleware;
