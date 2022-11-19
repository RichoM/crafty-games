
Crafty.c("Ghost", {
	_step: 0,
	log: undefined,
	init: function () {		
		this.addComponent("2D, Canvas, Bounds")
			.attr({w: 33, h: 55})
			.origin(16, 40)
			.bind("EnterFrame", this.step);
	},
	color: function (colorIndex) {
		this.addComponent("Car" + colorIndex.toString() + "_sprite");
		return this;
	},
	follow: function (log) {
		this._step = 0;
		if (this.log === undefined || this.log.length >= log.length)
			this.log = log;
		return this;
	},
	step: function () {
		if (this.log === undefined) return;
		var current = this.log[this._step];
		if (current === undefined) return;
		this.attr({
			x: current.position.x,
			y: current.position.y,
			rotation: current.rotation
		});
		this._step++;
	},
});			