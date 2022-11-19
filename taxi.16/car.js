Crafty.c("Car", {
	previous: new Vector(),
	
	throttle: 0,
	acceleration: 0.02,
	maxSpeed: 15,

	steering: 0,
	steeringSpeed: 0.07,
	maxTurn: 40,
	
	skid: 0.95,
	life: 1,
	init: function () {		
		this.addComponent("2D, Canvas, Bounds, Collision, Tween")
			.attr({w: 33, h: 55})
			.origin(16, 40)
			.bind("EnterFrame", this.step)
			.collision(new Crafty.polygon([0,0],[0,55],[33,55],[33,0]))
			.onHit("Car", this.hitCar)
			.onHit("Building", this.hitBuilding)
			.onHit("Sidewalk", this.hitSidewalk);
	},
	color: function (colorIndex) {
		this.addComponent("Car" + colorIndex.toString() + "_sprite");
		return this;
	},
	hitCar: function (data) {
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
			
			this.life -= v.magnitude() / (this.maxSpeed * 5);
			car.life -= v.magnitude() / (this.maxSpeed * 5);
		}
	},
	hitBuilding: function (data) {		
		var building = data[0].obj,
			normal = new Vector(data[0].normal).magnitude(-data[0].overlap);
		
		this.x -= this.previous.x();
		this.y -= this.previous.y();
		
		this.previous = this.previous.degrees(normal.degrees()).multiplyMagnitude(0.75);
		//this.previous = this.previous.multiplyMagnitude(0.75);
		this.life -= 0.01 + this.previous.magnitude() / (this.maxSpeed * 5);
	},
	hitSidewalk: function (data) {
		var sidewalk = data[0].obj; // We only care for the first
		sidewalk.rumble(this);
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
	step: function () {
		if (this.alpha !== this.life)
			this.alpha = this.life;
		
		if (this.life <= 0)
			this.destroy();
			
		// If the car is not moving then avoid further calculations...
		if (this.previous.isZero() && this.throttle === 0) return;
		
		var previous = this.previous,
			current = new Vector({
					magnitude: (this.throttle * this.maxSpeed * (1 - this.skid)),
					degrees: this.rotation - 90
				});
		
		if (previous.closeToZero()) {
			previous = new Vector();
		} else {
			previous = previous.multiplyMagnitude(this.skid);
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