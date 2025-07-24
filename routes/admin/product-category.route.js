const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");
const multer  = require('multer')
const storageMulter = require("../../helpers/storageMulter")  ;
const upload = multer({ storage: storageMulter() });
const validate = require("../../validates/admin/product.validate");

router.get("/",controller.index);

router.get("/create", controller.create);

router.post("/create",upload.single('thumbnail'), controller.createPost);

module.exports = router;