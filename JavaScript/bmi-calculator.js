function bmiCalculator(weight, height) {
	let bmi = Math.round(weight / (height * height));
	let interpretation;

	if (bmi < 18.5) {
		interpretation = "our BMI is " + bmi + ", so you are underweight.";
	} else if (bmi > 24.9) {
		interpretation = "Your BMI is " + bmi + ", so you are overweight.";
	} else {
		interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
	}

	return interpretation;
}

bmiCalculator(80, 1.85);
