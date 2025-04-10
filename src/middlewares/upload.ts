import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory for now

const upload = multer({ storage: storage });

export default upload;
