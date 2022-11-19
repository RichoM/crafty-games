
var rnd = Crafty.math.randomInt;

function randomColor () {	
	return "rgb(" + rnd(0, 255) + "," + rnd(0, 255) + "," + rnd(0, 255) + ")";
}

window.onload = (function() {
    var WIDTH = 500,
        HEIGHT = 500;
	
    Crafty.init(WIDTH, HEIGHT);   
	
	for (var i = 0; i < 550; i++) {
		Crafty.e("2D, Canvas, Color")
			.color(randomColor())
			.attr({
				x: rnd(0, WIDTH), 
				y: rnd(0, HEIGHT), 
				w: 50, 
				h: 100, 
				rotation: rnd(0,360)
			})
			.origin("center")
			.bind("EnterFrame", function () {
				this.rotation++;
			});
	}

});

