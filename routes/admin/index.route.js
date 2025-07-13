const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
module.exports = (app) => {
	const PATH_ADMIN = prefixAdmin;
	
	app.use(PATH_ADMIN, dashboardRoutes);

	app.use(PATH_ADMIN + "/products", productRoutes);
}