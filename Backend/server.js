const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const PDFDocument = require('pdfkit');
const cors = require ('cors')

const app = express();
const port = 8000;

app.use(cors())

// Setting up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/convertFile', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!!" });
    }

    const filePath = path.join(__dirname, req.file.path);

    // 1: Read the .docx content
    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value; // Raw text from docx

    // 2: Create PDF
    const doc = new PDFDocument();
    const outputPath = path.join(__dirname, 'files', `${req.file.originalname.split('.')[0]}.pdf`);
    const writeStream = fs.createWriteStream(outputPath);

    doc.pipe(writeStream);
    doc.fontSize(12).text(text); // Write the text into the PDF
    doc.end();

    writeStream.on('finish', () => {
      res.download(outputPath, () => {
        console.log('File downloaded');
      });
    });

  } catch (error) {
    console.log("Error in uploading", error);
    res.status(500).json({ message: "Internal server Error or Something went wrong!!" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
