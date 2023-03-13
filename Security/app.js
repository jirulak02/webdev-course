require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "Our little secret.",
	resave: true,
	saveUninitialized: true,
	cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://0.0.0.0:27017/userDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(new LocalStrategy(User.authenticate())/*User.createStrategy()*/);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/login", function(req, res) {

});

app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
	async function myRegister() {
		console.log("myRegister function");
		const userRegistered = User.register({username: req.body.username}, req.body.password);

		if (userRegistered) {
			console.log("User registered");
			passport.authenticate("local", {failureRedirect: "/register"});
			res.redirect("/secrets");
		} else {
			res.redirect("/register");
		}
	}
	myRegister();
});

app.get("/secrets", function(req, res) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		res.render("secrets");
	} else {
		res.redirect("/login");
	}
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
