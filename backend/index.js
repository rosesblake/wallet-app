require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const depositRoutes = require("./routes/deposit");
const transactionsRoutes = require("./routes/transactions");

const cookieParser = require("cookie-parser"); //store JWT safely in cookies

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://wallet-app-64c1.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/deposit", depositRoutes);
app.use("/transactions", transactionsRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");

  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  } else {
    console.warn("⚠️ frontend/build not found – skipping static serve.");
  }
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
