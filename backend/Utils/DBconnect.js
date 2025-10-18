const mongoose = require("mongoose");

const DBConnectionHandler = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI); // No options needed
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = DBConnectionHandler;
