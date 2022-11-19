Crafty.c("Bounds", {
	init: function() {
		this.requires("2D, Property");
		this.defineProperties();
	},		
	defineProperties: function () {
		// center, bounds, top, bottom, left, right
		this.property({
			name: "center",
			setter: function (v) { this.setCenter(v); },
			getter: function () { return this.getCenter(); }
		});
		this.property({
			name: "bounds",
			setter: function (v) { this.setBounds(v); },
			getter: function () { return this.getBounds(); }
		});
		this.property({
			name: "top",
			setter: function (v) { this.setTop(v); },
			getter: function () { return this.getTop(); }
		});
		this.property({
			name: "bottom",
			setter: function (v) { this.setBottom(v); },
			getter: function () { return this.getBottom(); }
		});
		this.property({
			name: "left",
			setter: function (v) { this.setLeft(v); },
			getter: function () { return this.getLeft(); }
		});
		this.property({
			name: "right",
			setter: function (v) { this.setRight(v); },
			getter: function () { return this.getRight(); }
		});
	},
	
	// Actual methods
	getCenter: function () {
		return {
			x: this.x + (this.w / 2),
			y: this.y + (this.h / 2)
		}
	},
	setCenter: function (center) {
		this.x = center.x - this.w / 2;
		this.y = center.y - this.h / 2;
		return this;
	},	
	getBounds: function () {
		return {
			top: this.getTop(),
			bottom: this.getBottom(),
			left: this.getLeft(),
			right: this.getRight()
		}
	},
	setBounds: function (bounds) {
		this.x = bounds.left;
		this.y = bounds.top;
		this.w = bounds.right - bounds.left;
		this.h = bounds.bottom - bounds.top;
		return this;
	},
	getTop: function () {
		return this.y;
	},
	getBottom: function () {
		return this.y + this.h;
	},
	getLeft: function () {
		return this.x;
	},
	getRight: function () {
		return this.x + this.w;
	},
	setTop: function (top) {
		this.y = top;
		return this;
	},
	setBottom: function (bottom) {
		this.y = bottom - this.h;
		return this;
	},
	setLeft: function (left) {
		this.x = left;
		return this;
	},
	setRight: function (right) {
		this.x = right - this.w;
		return this;
	}
});