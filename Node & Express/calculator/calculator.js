//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	let num1 = Number(req.body.num1);
	let num2 = Number(req.body.num2);
	let result = num1 + num2;

	res.send("The result of the calculation is " + result);
});

app.get("/bmicalculator", function(req, res) {
	res.sendFile(__dirname + "/bmi-calculator.html");
});

app.post("/bmicalculator", function(req, res) {
	let weight = parseFloat(req.body.weight);
	let height = parseFloat(req.body.height);
	let bmi = Math.round(weight / (height * height));

	res.send("<h1>Your BMI is " + bmi + "</h1>");
});

app.listen(3000, (error) => {
	if(!error)
        console.log("Server is Successfully Running, and App is listening on port 3000")
    else {
        console.log("Error occurred, server can't start", error);
    }
});
