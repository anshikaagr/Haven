const Document = require("../models/Document");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.createDocument = async (req, res) => {
  try {
    const { title, category} = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "haven-documents",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      const result = await uploadFromBuffer();
    const document = await Document.create({
      title,
      category,
      fileUrl: result.secure_url,
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