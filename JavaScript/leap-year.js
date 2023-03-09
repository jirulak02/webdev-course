function isLeap(year) {
	let leap = "Leap year.";
	let notLeap = "Not leap year.";

	if (year % 400 === 0) {
		return leap;
	} else if (year % 4 === 0 && year % 100 !== 0 ) {
		return leap;
	}

	return notLeap;
}

isLeap(2000);
