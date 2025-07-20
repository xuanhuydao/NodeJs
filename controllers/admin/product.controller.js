const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    const filterStatus = filterStatusHelper(req.query);

    if(req.query.status) {
        find.status = req.query.status;
    }
    let keyword = "";
    if(req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }else{
         keyword = "";
    }
    
    const products = await Product.find(find);

    products.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });

    

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}