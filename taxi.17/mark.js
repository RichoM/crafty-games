
Crafty.c("Mark", {
	shared: {},
	number: 0,
	_next: undefined,
	init: function () {	
		this.addComponent("Collision");
		this.collision();
		this.removeComponent("Canvas");
	},
	dist: function (e1, e2) {
		return Crafty.math.squaredDistance(e1.x, e1.y, e2.x, e2.y);
	},
	first: function () {
		if (this.shared.first !== undefined) return this.shared.first;
		var result = undefined;
		Crafty("Mark").each(function () { if (this.number === 0) result = this; });
		this.shared.first = result;
		return result;
	},
	count: function () {
		if (this.shared.count !== undefined) return this.shared.count;
		var c = 0;
		Crafty("Mark").each(function () {
			if (this.number > c) c = this.number;
		});
		this.shared.count = c + 1;
		return this.shared.count;
	},
	next: function () {
		if (this._next) return this._next;
			
		var that = this,			
			nextNumber = (this.number + 1) % this.count(),
			closest = undefined,
			closestDist = undefined;
			
		Crafty("Mark").each(function () {
			if (this.number === nextNumber) {
				var d = this.dist(that, this);
				if (closest === undefined ||
					d < closestDist) {
					closest = this;
					closestDist = d;
				}
			}
		});
		
		this._next = closest;
		return closest;
	}
});