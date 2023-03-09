const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/weather", function(req, res) {
	res.sendFile(__dirname + "/weather.html");
});

app.post("/weather", function(req, res) {
	const query = req.body.cityName;
	const apiKey = "<secrets.txt>";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&lang=en&units=metric";

	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on("data", function(data) {
			let weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

			res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
			res.write("<p>The weather is currently " + description + ".</p>");
			res.write("<img src=" + icon + ">");
			res.write("<form action=" + "/" + " method=" + "get" + "><button type=" + "submit" + ">Get Back</button></form>");
			res.send();
		});
	});
});



app.listen(3000, function(error) {
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port 3000");
	else {
		console.log("Error occurred, server can't start", error);
	}
});
