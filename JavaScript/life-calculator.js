function lifeInWeeks(age) {
	let x = (90 - age) * 365;
	let y = (90 - age) * 52;
	let z = (90 - age) * 12;

	console.log("You have " + x + " days, " + y + " weeks, and " + z + " months left.");
}

lifeInWeeks(20);
lifeInWeeks(0);
lifeInWeeks(55);
