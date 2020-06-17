var express = require("express");
var moment = require("moment");
var router = express.Router();
const getGeocode = require("../utils/getGeocode");
const getForecast = require("../utils/getForecast");
/* GET home page. */
router.get("/", async function (req, res, next) {
	try {
		console.log(req.query);
		// get the city value
		const { city } = req.query;
		console.log(city);
		if (!city) {
			res.render("index", { title: "Super Deadly & Venomous Spider" });
		}
		// else
		const location = await getGeocode(city);
		console.log("geocode here:", location);
		// get coords from location.geometry.coordinates
		const forecast = await getForecast(location.geometry.coordinates);
		forecast.current.fTemp = (forecast.current.temp * 9) / 5 + 32;
		let hourlyForecast = forecast.hourly.filter((item, idx) => idx % 2 == 0 && idx < 24);
		console.log(hourlyForecast);
		hourlyForecast.map((item, idx) => {
			hourlyForecast[idx].time = moment.unix(item.dt).format("LT");
		});
		res.render("index", { title: "Super Deadly & Venomous Spider", forecast: forecast.current, hourly: hourlyForecast, location: location });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
