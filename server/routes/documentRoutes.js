const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
} = require("../controllers/documentController");

router.post("/", protect, upload.single("file"), createDocument);
router.get("/", protect, getDocuments);
router.delete("/:id", protect, deleteDocument);
router.put("/:id", protect, updateDocument);

module.exports = router;