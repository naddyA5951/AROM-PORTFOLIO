const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AROMA Portfolio Backend is Running!"
  });
});

// Contact Form API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields."
    });
  }

  console.log("\n========== NEW CONTACT MESSAGE ==========");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
  console.log("=========================================\n");

  res.status(200).json({
    success: true,
    message: "Message received successfully!"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});