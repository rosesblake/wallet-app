require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const depositRoutes = require("./routes/deposit");
const transactionsRoutes = require("./routes/transactions");

const cookieParser = require("cookie-parser"); //store JWT safely in cookies

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000"];

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

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
