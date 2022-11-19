
Crafty.c("Camera", {
	vp: Crafty.viewport,
	init: function () {
		this.addComponent("2D, Bounds")
			.attr({w: this.vp.width, h: this.vp.height})
			.bind("Move", this.updateViewport);		
	},
	updateViewport: function () {
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
		target.bind("EnterFrame", function () {
			that.x = target.x + target.w / 2 - offx;
			that.y = target.y + target.h / 2 - offy;
		});
		return this;
	},
	keepWithinBounds: function (bounds) {
		this.bind("EnterFrame", function () {
			if (this.left < bounds.left) this.left = bounds.left;
			else if (this.right > bounds.right) this.right = bounds.right;
			if (this.top < bounds.top) this.top = bounds.top;
			else if (this.bottom > bounds.bottom) this.bottom = bounds.bottom;
		});
		return this;
	}
});