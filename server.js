const User = require("../BackEnd/Models/User");
const Room = require("../BackEnd/Models/Room"); // Import the Room model
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const Contact = require("./Models/Contact");
const path = require("path");

const app = express();
const port = process.env.PORT || 5713;

// Connect to your MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/UserData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// CORS
app.use(cors());
// Middleware to parse JSON
app.use(bodyParser.json());
app.use(morgan("dev"));

app.post("/signUp", async (req, res) => {
  const userData = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // If the user doesn't exist, create a new user document using the User model
    const newUser = new User(userData);
    await newUser.save();

    console.log("Saved to the database...");

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password (without hashing)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads"); // Specify the destination directory for uploaded files
  },
  filename: (_req, file, cb) => {
    // Define how the file should be named
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
app.use;
// Controller to handle room addition
app.post("/addRoom", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File were not uploaded" });
  }
  try {
    const imageUrl = req.file.filename;
    // Create a new Room document from the request data
    const newRoom = new Room({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      images: imageUrl, // You may need to store the image URL or file path
    });

    // Save the new Room document to the database
    await newRoom.save();

    // Respond with a success message or the new room data
    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use("/images", express.static("./uploads"));

app.post("/contact", async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const newMessage = new Contact({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      message: req.body.message,
    });

    await newMessage.save();

    console.log("Saved to the database...");

    res
      .status(200)
      .json({ message: "Message is sent successfully", contact: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/getRooms", async (_req, res) => {
  try {
    const rooms = await Room.find(); // Use Room model to query the rooms
    res.json(rooms);
    console.log(rooms);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
