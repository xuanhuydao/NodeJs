const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer  = require('multer')
const storageMulter = require("../../helpers/storageMulter")  ;
const upload = multer({ storage: storageMulter() });
const validate = require("../../validates/admin/product.validate");

router.get("/",controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi-status", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'), validate.createPost, controller.createPost);

module.exports = router;
