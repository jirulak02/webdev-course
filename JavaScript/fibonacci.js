function fibonacciGenerator(n) {
	let array = [0, 1];

	if (n <= 0) {
		return [];
	} else if (n === 1) {
		return [0];
	} else if (n === 2) {
		return [0, 1];
	}

	for (let i = 3; i <= n; i++) {
		array.push(array[i - 3] + array[i - 2]);
	}

	return array;
}

fibonacciGenerator(15);
