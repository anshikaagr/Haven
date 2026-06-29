const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createDocument,
  getDocuments,
} = require("../controllers/documentController");

router.post("/", protect, upload.single("file"), createDocument);
router.get("/", protect, getDocuments);

module.exports = router;