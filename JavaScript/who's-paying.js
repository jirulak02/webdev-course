function whosPaying(names) {
	let number = Math.floor(Math.random() * names.lenght);

	return names[number] + " is going to buy lunch today!";
}

console.log(whosPaying(["Angela", "Ben", "Jenny", "Michael", "Chloe"]))
