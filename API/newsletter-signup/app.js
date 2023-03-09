const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		}]
	};
	const jsonData = JSON.stringify(data);

	const url = "<secrets.txt>";

	const options = {
		method: "POST",
		auth: "<secrets.txt>"
	}

	const request = https.request(url, options, function(response) {
		response.on("data", function(data) {
			console.log(JSON.parse(data));
			console.log(response.statusCode);
			if (response.statusCode === 200) {
				res.sendFile(__dirname + "/success.html");
			} else {
				res.sendFile(__dirname + "/failure.html");
			}
		})
	});

	request.write(jsonData);
	request.end();
});

app.post("/failure", function(req, res) {
	res.redirect("/");
});

app.post("/success", function(req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(error) {
	if (!error) {
		console.log("Server is running.");
	} else {
		console.log("Server error: " + error);
	}
});
