const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"]
}));

app.use(express.json());

/* ================= UPLOAD FOLDER ================= */

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= SERVER + SOCKET ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

/* ================= DB ================= */

mongoose.connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* ================= MODELS ================= */

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  semester: String,
  collegeName: String,
  faculty: String,
  password: String
}, { timestamps: true }));

const Group = mongoose.model("Group", new mongoose.Schema({
  name: String,
  semester: String
}, { timestamps: true }));

const Message = mongoose.model("Message", new mongoose.Schema({
  groupId: String,
  message: String,
  sender: String,
  file: String
}, { timestamps: true }));

/* ================= FILE UPLOAD ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

const upload = multer({ storage });

app.post("/upload/:groupId", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const msg = await Message.create({
      groupId: req.params.groupId,
      file: fileUrl,
      sender: "User"
    });

    io.to(req.params.groupId).emit("receiveMessage", msg);

    res.json({
      message: "File uploaded",
      file: fileUrl
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= AUTH ================= */

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashed
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1d"
    });

    res.json({ user, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GROUP ================= */

// CREATE
app.post("/groups", async (req, res) => {
  try {
    const { name, semester } = req.body;

    if (!name || !semester) {
      return res.status(400).json({ message: "All fields required" });
    }

    const group = await Group.create({ name, semester });
    res.json(group);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
app.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/groups/:id", async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CHAT ================= */

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("sendMessage", async ({ groupId, message }) => {
    try {
      if (!message) return;

      const msg = await Message.create({
        groupId,
        message,
        sender: "User"
      });

      io.to(groupId).emit("receiveMessage", msg);

    } catch (err) {
      console.log("Chat Error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

// GET CHAT HISTORY
app.get("/messages/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({
      groupId: req.params.groupId
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= START ================= */

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});