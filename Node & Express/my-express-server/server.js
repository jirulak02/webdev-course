//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(req, res) {
	res.send("<h1>Hello World</h1>");
})

app.get("/contact", function(req, res) {
	res.send("Contact me at: jirulak02@gmail.com");
})

app.get("/about", function(req, res) {
	res.send("<h1>My name is Jirka Simecek</h1><p>I am 20 years old</p><p>Currently learning web dev</p>")
})

app.listen(3000, (error) => {
	if(!error)
        console.log("Server is Successfully Running, and App is listening on port 3000")
    else {
        console.log("Error occurred, server can't start", error);
    }
});
