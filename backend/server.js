const express = require('express')
dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');

//Define app
const app = express()

app.use(express.json());

const port = process.env.PORT

//Cors Settings
const devOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176", // Vite
  "http://localhost:3000", // React dev server / same port sometimes
  "http://localhost:4200", // Angular
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4200",
];

app.use(
  cors({
    origin: devOrigins,          // do NOT use "*" with credentials
    credentials: true,           // needed if frontend uses fetch(..., { credentials: 'include' })
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve frontend build
app.use(express.static(path.join(__dirname, "build")));

// SPA fallback (must be last)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Routes
const contactRouter = require('./routes/contact');

app.use('/api/contact', contactRouter);

//Start Server
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})

