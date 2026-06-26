const Document = require("../models/Document");

exports.createDocument = async (req, res) => {
  try {
    const { title, category, fileUrl } = req.body;

    const document = await Document.create({
      title,
      category,
      fileUrl,
      user: req.user.id,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user.id,
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};