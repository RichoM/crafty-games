Crafty.c("Car", {
	
	externalBounds: undefined,
	previous: new Vector(),
	
	throttle: 0,
	acceleration: 0.02,
	maxSpeed: 20,

	steering: 0,
	steeringSpeed: 0.06,
	maxTurn: 40,
	
	skid: 0.95,
	
	init: function () {		
		this.addComponent("2D, Canvas, Bounds")
			.attr({w: 33, h: 55})
			.origin(16, 40)
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90})
			.bind("EnterFrame", this.step)
			/*.collision(new Crafty.polygon([0,0],[0,33],[55,33],[55,0]))
			.onHit("Car", function (data) {
				for (var i = 0; i < data.length; i++) {
					var car = data[i].obj;
					var normal = data[i].normal;
					
					car.x -= normal.x;
					car.y -= normal.y;
					this.x += normal.x;
					this.y += normal.y;
					
					var v = car.previous.subtract(this.previous);
					this.previous = this.previous.add(v);
					car.previous = car.previous.subtract(v);
				}
			})*/;
	},
	color: function (colorIndex) {
		this.addComponent("Car" + colorIndex.toString() + "_sprite");
		return this;
	},
	brake: function () {
		this.throttle *= 0.85;
		return this;
	},
	accelerate: function () {
		this.throttle += this.acceleration;
		if (this.throttle > 1) this.throttle = 1;
		return this;
	},
	goInReverse: function () {
		this.throttle -= this.acceleration / 2;
		if (this.throttle < -0.5) this.throttle = -0.5;
		return this;
	},
	slowDown: function () {
		if (this.throttle >= 0.01) {
			this.throttle -= this.acceleration;
		} else if (this.throttle <= -0.01) {
			this.throttle += this.acceleration;
		} else {
			this.throttle = 0;
		}
		return this;
	},
	steerRight: function () {
		if (this.steering < 0) this.dropSteeringWheel();
		this.steering += this.steeringSpeed;
		if (this.steering > 1) this.steering = 1;
		return this;
	},
	steerLeft: function () {
		if (this.steering > 0) this.dropSteeringWheel();
		this.steering -= this.steeringSpeed;
		if (this.steering < -1)	this.steering = -1;
		return this;
	},
	dropSteeringWheel: function () {
		this.steering = 0;
		return this;
	},
	keepWithinBounds: function (bounds) {
		this.externalBounds = bounds;
		return this;
	},
	checkBounds: function () {
		if (!this.externalBounds) return;
		var map = this.map,
			bounceH = false,
			bounceV = false,
			left = this.externalBounds.left,
			right = this.externalBounds.right,
			top = this.externalBounds.top,
			bottom = this.externalBounds.bottom;
		
		for (var i = 0; i < map.points.length; i++) {
			var point = {x: map.points[i][0], y: map.points[i][1]};
			if (point.x <= left) {
				bounceH = true;
				this.x -= point.x;
			} else if (point.x >= right) {
				bounceH = true;
				this.x -= (point.x - right);
			}
			if (point.y <= top) {
				bounceV = true;
				this.y -= point.y;
			} else if (point.y >= bottom) {
				bounceV = true;
				this.y -= (point.y - bottom);
			}
			
			if (bounceH)
				this.previous = this.previous.x(this.previous.x() * -1);
			if (bounceV)	
				this.previous = this.previous.y(this.previous.y() * -1);
			if (bounceH || bounceV) {
				this.previous = this.previous.magnitude(this.previous.magnitude() * 0.75);
				return this;
			}
		}
	},
	step: function () {
		//this.checkBounds();

		var previous = this.previous,
			current = new Vector({
					magnitude: (this.throttle * this.maxSpeed * (1 - this.skid)),
					degrees: this.rotation - 90
				});
		
		if (previous.closeToZero()) {
			previous = new Vector();
		} else {
			previous = previous.magnitude(previous.magnitude() * this.skid);
		}	
		
		var delta = previous.add(current);
		
		this.attr({
			x: this.x + delta.x(),
			y: this.y + delta.y(),
			rotation: this.rotation + this.throttle * this.steering * this.maxTurn / 10
		});
		
		this.previous = delta;
	},
	
});