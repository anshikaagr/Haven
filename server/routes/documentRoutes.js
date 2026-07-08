const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  toggleImportant,
} = require("../controllers/documentController");

router.post("/", protect, upload.single("file"), createDocument);
router.get("/", protect, getDocuments);
router.delete("/:id", protect, deleteDocument);
router.put("/:id", protect, updateDocument);
router.patch("/:id/important", protect, toggleImportant);

module.exports = router;