
Crafty.c("Car", {
	init: function () {
		this.addComponent("2D, Canvas, Keyboard, Bounds, Car4_sprite")
			.origin(16, 40)
			.attr({w: 33, h: 55})
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90});				
	}
});			
	