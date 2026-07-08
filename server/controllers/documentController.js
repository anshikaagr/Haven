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
      publicId: result.public_id,
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

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    console.log(document);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await cloudinary.uploader.destroy(document.publicId, {
      resource_type: "raw",
    });

    await document.deleteOne();

    res.json({
      message: "Document deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { title, category } = req.body;

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.title = title;
    document.category = category;

    await document.save();

    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};