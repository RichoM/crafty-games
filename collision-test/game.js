
window.onload = (function() {	
    Crafty.init(600, 600);   
	
	Crafty.c("Rect", {
		direction: Crafty.math.randomElementOfArray([-2, 2]),
		init: function () {
			this.addComponent("2D, Canvas, Color, Collision, Draggable");
			this.color("#CF8500")				
				.bind("EnterFrame", function () {
					this.rotation += this.direction;
				})
				.attr({w: 30, h: 150})
				.collision()
				.origin("center")
				.onHit("Rect", function () {
					this.direction *= -1;
				});
		}		
	});
	
	Crafty.e("Rect")
		.attr({x: 200, y: 200});
		
	Crafty.e("Rect")
		.attr({x: 300, y: 100});
		
	Crafty.e("2D, Canvas, Color")
		.attr({x: 0, y: 0, w: 600, h: 600, alpha: 0.5})
		.color("#010101")
});

