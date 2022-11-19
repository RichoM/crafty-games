
Crafty.c("Camera", {
	futureX: 0,
	futureY: 0,
	vp: Crafty.viewport,
	init: function () {
		this.addComponent("2D")
			.attr({w: this.vp.width, h: this.vp.height})
			.bind("EnterFrame", this.step);
			//.bind("Move", this.updateViewport);		
	},
	step: function () {
		if (this.externalBounds) this.checkBounds();
		this.attr({x: this.futureX, y: this.futureY});
		this.vp.x = this.x * -1;
		this.vp.y = this.y * -1;
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
			that.futureX = target.x + target.w / 2 - offx;
			that.futureY = target.y + target.h / 2 - offy;
		});
		return this;
	},
	keepWithinBounds: function (bounds) {
		this.externalBounds = bounds;
		return this;
	},
	checkBounds: function () {
		var bounds = this.externalBounds;
		if (this.futureX < bounds.left) this.futureX = bounds.left;
		else if ((this.futureX + this.w) > bounds.right) this.futureX = bounds.right - this.w;
		if (this.futureY < bounds.top) this.futureY = bounds.top;
		else if ((this.futureY + this.h) > bounds.bottom) this.futureY = bounds.bottom - this.h;
	}
});