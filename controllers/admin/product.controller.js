const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const panigationHelper = require("../../helpers/panigation");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    //#region filterStatus
    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status) {
        find.status = req.query.status;
    }
    //#endregion


    //#region search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.keyword !== "") {
        find.title = objectSearch.regex;
    }
    //#endregion


    //#region pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = panigationHelper({
        currentPage: 1,
        limitItems: 8,
    },
        req.query,
        countProducts
    )
    //#endregion

    //#region sort
    const sort = {};
    if(req.query.sortKey && req.query.sortType) {
        sort[req.query.sortKey] = req.query.sortType;
    }
    //#endregion
    const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    products.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });


    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
        sortKey: req.query.sortKey || "position",
        sortType: req.query.sortType || "asc",
    });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
    res.redirect("/admin/products");

}

// [PATCH] /admin/products/change-multi-status
module.exports.changeMultiStatus = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() });
            req.flash("success", "Xóa sản phẩm thành công");
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateMany({ _id: id }, { position: position });
                req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
            }

            break;
        default:
            break;
    }
    res.redirect("/admin/products");

}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
    res.redirect("/admin/products");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create");
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.discountPercentage = Number(req.body.discountPercentage);
    req.body.stock = Number(req.body.stock);
    console.log(req.file);
    const count = await Product.countDocuments({ deleted: false }) + 1;
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product({
        ...req.body,
        position: count + 1,

    });
    await product.save();

    req.flash("success", "Thêm sản phẩm thành công");
    res.redirect("/admin/products");
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false,
    }

    const  product = await Product.findOne(find);

    res.render("admin/pages/products/edit",{
        product: product
    });
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.discountPercentage = Number(req.body.discountPercentage);
    req.body.stock = Number(req.body.stock);
    req.body.position = Number(req.body.position);
    const count = await Product.countDocuments({ deleted: false }) + 1;
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
         await Product.updateOne({ _id: req.params.id}, {
        ...req.body,
        position: count + 1,
    });
        req.flash("success", "Cập nhật sản phẩm thành công");
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");
    }
 
    res.redirect("/admin/products");
}