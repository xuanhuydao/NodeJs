// [GET] /admin/products
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {  
    const products = await Product.find();
   
    products.forEach(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
    });

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
    });
}