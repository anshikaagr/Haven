const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createDocument,
  getDocuments,
} = require("../controllers/documentController");

router.post("/", protect, createDocument);
router.get("/", protect, getDocuments);

module.exports = router;