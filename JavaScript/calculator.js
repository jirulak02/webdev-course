function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function devide(num1, num2) {
	return num1 / num2;
}

function calculator(num1, num2, operator) {
	return operator(num1, num2);
}

calculator(20, 4, devide);
