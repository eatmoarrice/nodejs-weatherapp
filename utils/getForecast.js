const axios = require("axios");
require("dotenv").config({ path: ".env" });

const getForecast = async ([lon, lat]) => {
	try {
		const token = process.env.OPEN_WEATHER_KEY;
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${token}&exclude={daily,minutely}&units=metric`;
		console.log(url);
		const res = await axios.get(url);
		console.log(res.data.hourly[0]);
		return res.data;
	} catch (err) {
		throw err;
	}
};

module.exports = getForecast;
