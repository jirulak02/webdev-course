const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://user:test-123@cluster0.rq2usmb.mongodb.net/todolistDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const itemsSchema = new mongoose.Schema({
	name: String
});
const Item = mongoose.model("Item", itemsSchema);

const listSchema = new mongoose.Schema({
	name: String,
	items: [itemsSchema]
});
const List = mongoose.model("List", listSchema);

const item1 = new Item({
	name: "Clean my room"
});

const item2 = new Item({
	name: "Finish the WebDev course"
});

const item3 = new Item({
	name: "Start React course"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
	async function myFindAll() {
		const findItems = await Item.find({});
		if (findItems.length === 0) {
			await Item.insertMany(defaultItems);
		}
		res.render("list", {listTitle: "Today", newListItems: findItems});
	}
	// still no idea how to make the disconnect work with awaits :)
	myFindAll()/*.finally(() => mongoose.disconnect())*/;
});

app.post("/", function(req, res){

	const itemName = req.body.newItem;
	const listName = req.body.list;

	const newItem = new Item({
		name: itemName
	});

	if (listName === "Today") {
		newItem.save();
		res.redirect("/");
	} else {
		async function myFindList() {
			const foundList = await List.findOne({name: listName});

			foundList.items.push(newItem);
			foundList.save();
			res.redirect("/" + listName);
		}
		myFindList();
	}
});

app.post("/delete", function(req, res) {
	async function deleteItem() {
		const checkedItemId = req.body.checkbox;
		const listName = req.body.listName;

		if (listName === "Today") {
			await Item.findByIdAndDelete(checkedItemId);

			res.redirect("/");
		} else {
			await List.findOneAndUpdate({name: listName}, {
				$pull: {items: {_id: checkedItemId}}
			});

			res.redirect("/" + listName);
		}
	}
	deleteItem();
});

app.get("/:paramName", function(req,res){
	async function myFindOne() {
		const enteredName = _.capitalize(req.params.paramName);

		const findList = await List.findOne({name: enteredName});
		if (!findList) {
			const list = new List({
				name: enteredName,
				items: defaultItems
			});

			list.save();
			res.redirect("/" + enteredName);
		} else {
			res.render("list", {listTitle: enteredName, newListItems: findList.items});
		}
	}
	myFindOne();
});

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}

app.listen(port, function() {
	console.log("Server started successfully");
});
