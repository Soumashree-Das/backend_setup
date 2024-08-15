// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {//req get all the request and if some file is being uploaded that can also be stored. reason why we use multer 
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)//here we upload the folder as its original name which will temporarily be uploadedto cloudede and then stored in the desired area. Use the documentation to customize accoridng to needs
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })

import multer from "multer";
import path from "path";

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/temp/my-uploads')); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Add limits and file filter
const limits = {
    fileSize: 2 * 1024 * 1024, // 2MB limit
};

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("File upload only supports the following filetypes - " + filetypes));
};

export const upload = multer({
    storage,
    limits,
    fileFilter,
});
