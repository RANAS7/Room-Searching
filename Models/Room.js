const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: String, // Assuming you store the image URL
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
