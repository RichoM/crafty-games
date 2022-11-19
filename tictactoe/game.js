
window.onload = (function() {
    var WIDTH = 300,
        HEIGHT = 300;
		
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);	
	
	// Load sprites
	Crafty.load(["assets/circle.png",
				"assets/cross.png"], function() { 	 
		Crafty.sprite("assets/circle.png", { Circle_sprite: [0, 0, 90, 90] });
		Crafty.sprite("assets/cross.png", { Cross_sprite: [0, 0, 90, 90] });		
	});
	
		
	// Cell
	Crafty.c("Cell", {
		marked: false,
		init: function() {
			this.addComponent("2D, Canvas, Bounds, Color, Mouse");
			this.w = 95;
			this.h = 95;
			this.color("#FFFFFF");
			this.bind("Click", function () {
				this.mark();				
				opponentTurn();
			});
		},
		mark: function () {
			if (this.marked) return;
			Crafty.e("Mark")
				.setCenter(this.center);				
			this.marked = true;
		}
	});
	
	Crafty.c("Mark", {
		init: function() {
			this.addComponent("2D, Canvas, Bounds");
			this.w = 90;
			this.h = 90;
			if (Crafty("Mark").length % 2 == 0)
				this.circle();
			else
				this.cross();
		},
		circle: function () {
			this.addComponent("Circle_sprite");
			return this;
		},
		cross: function () {
			this.addComponent("Cross_sprite");
			return this;
		}
	});
		
	// Set black background
	Crafty.background("#000000");
		
	// Create board
	board = [];
	for (var r = 0; r < 3; r++) {
		var row = [];
		board.push(row);
		for (var c = 0; c < 3; c++) {
			row.push(Crafty.e("Cell")
				.attr({x: c * 100 + 2.5, y: r * 100 + 2.5}));
		}
	}
});

