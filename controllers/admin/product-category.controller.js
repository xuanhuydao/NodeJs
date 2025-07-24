const ProductCategory = require("../../models/product-category.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  }
  const records = await ProductCategory.find(find);
  res.render("admin/pages/products-category/index", {records: records});
}
// [GET] /admin/products
module.exports.create = async (req, res) => {

  res.render("admin/pages/products-category/create");
}

// [POST] /admin/products
module.exports.createPost = async (req, res) => {
  const count = await ProductCategory.countDocuments({ deleted: false }) + 1;
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const records = new ProductCategory({
    ...req.body,
    position: count + 1,

  });
  await records.save();

  req.flash("success", "Thêm sản phẩm thành công");
  res.redirect("/admin/products-category");
}