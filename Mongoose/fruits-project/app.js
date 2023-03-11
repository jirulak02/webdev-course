const mongoose = require("mongoose");

// 0.0.0.0 gives ipv4 connection, ipv6 (127.0.0.1) doesn't work
mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);

const fruit = new Fruit({
	name: "Pineapple",
	rating: 9,
	review: "Yummi"
});

const kiwi = new Fruit({
	name: "Kiwi",
	rating: 7,
	review: "Random review."
});

const apple = new Fruit({
	name: "Apple",
	rating: 7,
	review: "Random review."
});

const banana = new Fruit({
	name: "Banana",
	rating: 7,
	review: "Random review."
});

const person = new Person({
	name: "John",
	age: 37,
	favoriteFruit: fruit
});

// needs to be "async" to enable "await"
async function main() {
	// add fruit to database
	fruit.save().then(() => console.log("added new fruit"));

	// add person to database
	person.save().then(() => console.log("added new person"));

	// add all listed fruits to database
	await Fruit.insertMany([kiwi, apple, banana]).then(() => console.log("all fruits added"));

	// add review to Pomelo fruit
	await Fruit.updateOne({name: "Pomelo"}, {review: "Hopefully it works"}).then(() => console.log("updated"));

	// delete one item with name Apple
	await Fruit.findOneAndDelete({ name: "Apple" }).then(() => console.log("deleted"));

	const results = await Fruit.find({});

	results.forEach(function(result) {
		console.log(result.name);
	});
}

main()
	.then(console.log())
	.catch(console.error)
	// close connection to database... so far doesn't work with insertMany(), updateOne(), findOneAndDelete(),...
	.finally(() => mongoose.disconnect());
