const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const filterStatus = filterStatusHelper(req.query);

    if(req.query.status) {
        find.status = req.query.status;
    }
    
    const objectSearch = searchHelper(req.query);
    if(objectSearch.keyword !== "") {
        find.title = objectSearch.regex;
    }
    const products = await Product.find(find);

    products.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });

    

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    });
}