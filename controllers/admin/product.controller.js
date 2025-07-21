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
        limitItems: 4,
    },
        req.query,
        countProducts
    )
    //#endregion


    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    products.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });


    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    console.log(req.params);
    await Product.updateOne({ _id: id }, { status: status });

    res.redirect("/admin/products");

}

// [PATHC] /admin/products/change-multi-status
module.exports.changeMultiStatus = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            break;
        default:
            break;
    }
    res.redirect("/admin/products");

}