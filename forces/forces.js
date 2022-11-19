
Crafty.c("Forces", {
	force: new Vector(0, 0),
	init: function () {
		this.addComponent("2D");				
	},
	applyForces: function () {
		this.attr({
			x: this.x + this.force.x, 
			y: this.y + this.force.y
		});
		this.resetForces();
	},
	addForce: function (x, y) {
		this.force = this.force.add(new Vector(x, y));
	},
	resetForces: function () {
		this.force = new Vector(0, 0);
	}
});