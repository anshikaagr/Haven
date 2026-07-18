const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    important: {
      type: Boolean,
      default: false,
    },

    expiryDate: {
      type: Date,
      default: null,
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", documentSchema);