const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  }
  const records = await Role.find(find);
  res.render("admin/pages/role/index.pug", {
    title: "Danh sách vai trò",
    records: records
  });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/role/create.pug")
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role({
    ...req.body
  })
  await record.save();
  req.flash("success", "Thêm mới nhóm quyền thành công");
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
}