require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const cookieOptions = require("./config/cookie");

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello Express 👋" });
});

app.get("/api", (req, res) => {
  res.cookie("accessToken", "Logi30", cookieOptions);
  res.status(200).json({
    success: true,
    message: "Expressと接続できました。",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));

// 404ハンドラー(どのルートにもマッチしなかった場合)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// エラーハンドリングミドルウェア(引数が4つなのが必須)
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});
