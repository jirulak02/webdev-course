// console.log($("img").attr("src"));

// $("h1").click(function () {
// 	$("h1").css("color", "purple");
// });

// $("button").click(function () {
// 	$("h1").css("color", "purple");
// });

// $("h1").on("mouseover", function() {
// 	$("h1").css("color", "blue");
// });

// $(document).on("keypress", function(event) {
// 	$("h1").html(event.key);
// });

// $("h1").before("<button>New button</button>");
// $("h1").after("<button>New button</button>");
// $("h1").prepend("<button>New button</button>");
// $("h1").append("<button>New button</button>");

// $("button").remove();

// $("button").on("click", function() {
// 	$("h1").hide();
// });

// $("button").on("click", function() {
// 	$("h1").toggle();
// });

// $("button").on("click", function() {
// 	$("h1").fadeToggle();
// });

// $("button").on("click", function() {
// 	$("h1").slideToggle();
// });

// $("button").on("click", function() {
// 	$("h1").animate({opacity: 0.5});
// });

$("button").on("click", function() {
	$("h1").slideUp().slideDown().animate({opacity: 0.5});
});
