
Crafty.c("Logger", {
	isLogging: false,
	log: undefined,
	init: function () {
		this.requires("2D");
		this.log = [];
		this.bind('EnterFrame', this.step);
	},
	startLogging: function () {
		this.isLogging = true;
	},
	step: function () {
		if (!this.isLogging) return;
		var target = this;
		this.log.push({
			position: {x: target.x , y: target.y},
			rotation: target.rotation
		});
	},
	reset: function () {
		this.log = [];
	}
});			