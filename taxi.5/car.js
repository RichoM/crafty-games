
Crafty.c("Car", {
	init: function () {
		var sprite = Crafty.assets["imgs/car.2.png"];
		this.addComponent("2D, Canvas, Keyboard, Bounds, Car_sprite")
			.origin(16, 40)
			.attr({w: sprite.width, h: sprite.height})
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90});				
	}
});			
	