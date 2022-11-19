Crafty.c("Car", {
	previous: new Vector(),
	forwardDist: 0,
	skid: 0.85,
	init: function () {		
		this.addComponent("2D, Canvas, Car4_sprite")
			.origin(16, 40)
			.attr({w: 33, h: 55})
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90})
			.bind("EnterFrame", this.step);
	},
	forward: function (dist) {
		this.forwardDist += (dist * (1 - this.skid));
	},
	turn: function (angle) {
		this.rotation += angle;
	},
	step: function () {
		var previous = this.previous,
			current = new Vector({
					magnitude: this.forwardDist,
					degrees: this.rotation - 90
				});
		
		if (previous.closeToZero()) {
			previous = new Vector();
		} else {
			previous = previous.magnitude(previous.magnitude() * this.skid);
		}	
		
		var delta = previous.add(current);//.degrees(this.rotation + this.turnAngle - 90);
		
		this.attr({
			x: this.x + delta.x(),
			y: this.y + delta.y()
		});
		
		this.previous = delta;
		this.forwardDist = 0;
	},
	
});