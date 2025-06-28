import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3130;

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files (your HTML form)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Ensure upload folder exists and setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload route
app.post('/profiles', upload.array('profileImage', 3), (req, res) => {
  res.status(200).json({ message: 'Files uploaded successfully'});
});

app.get('/api/sales-report/pdf', (req, res) => {
  const reportFilePath = path.join(__dirname, "reports/sample-report.pdf");
  const exist = fs.existsSync(reportFilePath);
  console.log("file exists:", exist);


    if(exist == true) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'sample-report.pdf');
      fs.createReadStream(reportFilePath).pipe(res);
    } else {
      res.status(404).json({message: "Report not available"})
    }
  //res.download(reportFilePath);
})
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
