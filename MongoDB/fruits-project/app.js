const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { family: 4 });

// Database Name
const dbName = 'fruitsDB';

async function main() {
	// Use connect method to connect to the server
	await client.connect();
	console.log('Connected successfully to server');
	const db = client.db(dbName);
	const collection = db.collection('fruits');

	// insert fruits into fruitsDB
	const insertResult = await collection.insertMany([
		{
			name: "Apple",
			score: 8,
			review: "Great fruit"
		},
		{
			name: "Banana",
			score: 7,
			review: "Could have more mass"
		}
	]);
	console.log('Inserted documents =>', insertResult);

	// delete records from fruitsDB
	const deleteResult = await collection.deleteOne({ name: "Banana" });
	console.log('Deleted documents =>', deleteResult);

	// SELECT * FROM fruitsDB
	const findResult = await collection.find({}).toArray();
	console.log('Found documents =>', findResult);

	return 'done.';
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());

