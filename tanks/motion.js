// Motion
Crafty.c("Motion", {
	init: function () {
		this.requires("2D");
	},
	turn: function (degrees) {
		this.rotation += degrees;
		return this;
	},
	forward: function (dist) {
		var rho = dist;
		var radians = this.rotation % 360;
		if (radians > 180) radians -= 360;
		radians = Crafty.math.degToRad(radians - 90);
		
		var dx = Math.cos(radians) * rho;
		var dy = Math.sin(radians) * rho;
		
		this.x += dx;
		this.y += dy;
		return this;
	}
});