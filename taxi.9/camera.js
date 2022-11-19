
Crafty.c("Camera", {
	externalBounds: undefined,
	vp: Crafty.viewport,
	init: function () {
		this.addComponent("2D")
			.attr({w: this.vp.width, h: this.vp.height})
			.bind("EnterFrame", this.step);
	},
	step: function () {
		this.checkBounds();
		this.vp.x = this.x * -1;
		this.vp.y = this.y * -1;
	},
	follow: function (target, offset) {
		var offx = 0,
			offy = 0;
		if (offset) {
			offx = offset.x;
			offy = offset.y;
		}
		
		var that = this; // Fucking javascript!
		target.bind("Move", function () {
			that.attr({
				x: target.x + target.w / 2 - offx,
				y: target.y + target.h / 2 - offy
			});
		});
		return this;
	},
	keepWithinBounds: function (bounds) {
		this.externalBounds = bounds;
		return this;
	},
	checkBounds: function () {
		if (this.externalBounds) {
			var bounds = this.externalBounds;
			if (this.x < bounds.left) this.x = bounds.left;
			else if ((this.x + this.w) > bounds.right) this.x = bounds.right - this.w;
			if (this.y < bounds.top) this.y = bounds.top;
			else if ((this.y + this.h) > bounds.bottom) this.y = bounds.bottom - this.h;
		}
	}
});