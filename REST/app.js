const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const articlesSchema = new mongoose.Schema({
	title: String,
	content: String
});
const Article = mongoose.model("Article", articlesSchema);

app.route("/articles")
	.get(function(req, res) {
		async function myFind() {
			const foundArticles = await Article.find({});

			if (foundArticles) {
				res.send(foundArticles);
			} else {
				res.send("No articles found");
			}
		}
		myFind();
	})
	.post(function(req, res) {
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content
		});

		newArticle.save();
		res.send("Article saved");
	})
	.delete(function(req, res) {
		async function myDelete() {
			const deletedArticles = await Article.deleteMany();

			if (deletedArticles >= 1) {
				res.send("Articles deleted");
			} else {
				res.send("Couldn't delete articles");
			}
		}
		myDelete();
	});

app.route("/articles/:articleTitle")
	.get(function(req, res) {
		async function myFindOne() {
			const foundArticle = await Article.findOne(
				{title: req.params.articleTitle}
			);

			if (foundArticle) {
				res.send(foundArticle);
			} else {
				res.send("No article matching title was found");
			}
		}
		myFindOne();
	})
	.put(function(req, res) {
		async function myReplaceOne() {
			const updatedArticle = await Article.findOneAndReplace(
				{title: req.params.articleTitle},
				{title: req.body.title, content: req.body.content}
			);

			if (updatedArticle) {
				res.send("Article replaced")
			} else {
				res.send("Couldn't replace article")
			}
		}
		myReplaceOne();
	})
	.patch(function(req, res) {
		async function myUpdateOne() {
			const updatedArticle = await Article.findOneAndUpdate(
				{title: req.params.articleTitle},
				{title: req.body.title, content: req.body.content}
			);

			if (updatedArticle) {
				res.send("Article updated")
			} else {
				res.send("Couldn't update article")
			}
		}
		myUpdateOne();
	})
	.delete(function(req, res) {
		async function myDeleteOne() {
			const deletedArticle = await Article.findOneAndDelete(
				{title: req.params.articleTitle}
			);

			if (deletedArticle) {
				res.send("Article deleted");
			} else {
				res.send("Couldn't delete article");
			}
		}
		myDeleteOne();
	});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
