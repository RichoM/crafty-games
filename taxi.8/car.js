Crafty.c("Car", {

	previous: new Vector(),
	
	speed: 0,
	acceleration: 0.02,
	maxSpeed: 10,

	steering: 0,
	steeringSpeed: 0.06,
	maxSteering: 30,
	
	skid: 0.95,
	
	init: function () {		
		this.addComponent("2D, Canvas")
			.origin(16, 40)
			.attr({w: 33, h: 55})
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90})
			.bind("EnterFrame", this.step);
	},
	brake: function () {
		this.speed *= 0.85;
	},
	accelerate: function () {
		this.speed += this.acceleration;
		if (this.speed > 1) this.speed = 1;
	},
	goInReverse: function () {
		this.speed -= this.acceleration / 2;
		if (this.speed < -0.5) this.speed = -0.5;
	},
	slowDown: function () {
		if (this.speed >= 0.01) {
			this.speed -= this.acceleration;
		} else if (this.speed <= -0.01) {
			this.speed += this.acceleration;
		} else {
			this.speed = 0;
		}
	},
	steerRight: function () {
		if (this.steering < 0) this.dropSteeringWheel();
		this.steering += this.steeringSpeed;
		if (this.steering > 1) this.steering = 1;
	},
	steerLeft: function () {
		if (this.steering > 0) this.dropSteeringWheel();
		this.steering -= this.steeringSpeed;
		if (this.steering < -1)	this.steering = -1;
	},
	dropSteeringWheel: function () {
		this.steering = 0;
	},
	step: function () {

		var previous = this.previous,
			current = new Vector({
					magnitude: (this.speed * this.maxSpeed * (1 - this.skid)),
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
			rotation: this.rotation + this.speed * this.steering * this.maxSteering / 10
		});
		
		this.previous = delta;
	},
	
});