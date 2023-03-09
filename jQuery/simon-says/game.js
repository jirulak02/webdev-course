let gamePattern = [];
let userClickedPatter = [];
let buttonColors = ["green", "red", "yellow", "blue"];
let started = false;
let level = -1;

$(".btn").on("click", function(event) {
	let userChosenColor = event.target.id;

	userClickedPatter.push(userChosenColor);
	playSound(event.target.id);
	animatePress(event.target.id);
	if (userClickedPatter.length === gamePattern.length) {
		if (checkAnswer(level) === true) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	}
})

$(document).on("keypress", function() {
	if (started === false) {
		started = true;
		nextSequence();
	}
});

function nextSequence() {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);
	userClickedPatter = [];
	level++;
	$("h1").html("Level " + level);

	showSequence();
}

async function showSequence() {
	for (let i = 0; i < gamePattern.length; i++) {
		await sleep(1000);
		$("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound(name) {
	let audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	for (let i = 0; i <= currentLevel; i++) {
		if (gamePattern[i] !== userClickedPatter[i]) {
			wrongAnswer();
			return false;
		}
	}
	return true;
}

function wrongAnswer() {
	playSound("wrong");

	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over");
	}, 200);
	$("h1").html("Game Over, Press Any Key to Restart");

	startOver();
}

function startOver() {
	level = -1;
	gamePattern = [];
	started = false;
}
