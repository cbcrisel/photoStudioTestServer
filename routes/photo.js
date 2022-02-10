const {Router}= require('express');
const { postPhoto, getPhotosByEvent } = require('../controllers/photo');
const { validateJWT } = require('../helpers/jwt');
const multer= require('multer');
const router= Router();



/* const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'/public/uploads');
    },
    filename: function (req,file,cb){
        cb(null,file.filename);
    }
});
const upload=multer({storage}); */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const ext=file.originalname.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+ext);
    }
  })
  
  const upload = multer({storage:storage});

router.post('/api/photo',[validateJWT,upload.single('file')], postPhoto);
router.get('/api/photosByEvent/:id', getPhotosByEvent);

module.exports= router;

