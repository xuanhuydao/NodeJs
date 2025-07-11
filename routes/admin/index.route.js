const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");

module.exports = (app) => {
	const PATH_ADMIN = prefixAdmin;
	
	app.use(PATH_ADMIN, dashboardRoutes);
}