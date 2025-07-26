const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");

module.exports = (app) => {
	const PATH_ADMIN = prefixAdmin;
	
	app.use(PATH_ADMIN, dashboardRoutes);

	app.use(PATH_ADMIN + "/products", productRoutes);

	app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);

		app.use(PATH_ADMIN + "/roles", roleRoutes);

}