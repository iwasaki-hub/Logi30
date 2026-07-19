const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected: `, conn.connection.name);
  } catch (err) {
    console.log(`❌ MongoDB connect Failed:`, err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
