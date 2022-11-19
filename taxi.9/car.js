Crafty.c("Car", {

	previous: new Vector(),
	
	throttle: 0,
	acceleration: 0.02,
	maxSpeed: 20,

	steering: 0,
	steeringSpeed: 0.06,
	maxTurn: 40,
	
	skid: 0.95,
	
	init: function () {		
		this.addComponent("2D, Canvas, Bounds, Collision")
			.origin(16, 40)
			.attr({w: 33, h: 55})
			.attr({x: 150 - 16, y: 150 - 40})
			.attr({rotation: 90})
			.bind("EnterFrame", this.step)
			.collision(new Crafty.polygon([0,0],[0,33],[55,33],[55,0]))
			.onHit("Car", function (data) {
				var car = data[0].obj;
				var normal = data[0].normal;
				
				car.x -= normal.x;
				car.y -= normal.y;
				this.x += normal.x;
				this.y += normal.y;
				
				var v = car.previous.subtract(this.previous);
				this.previous = this.previous.add(v);
				car.previous = car.previous.subtract(v);
			});
	},
	brake: function () {
		this.throttle *= 0.85;
	},
	accelerate: function () {
		this.throttle += this.acceleration;
		if (this.throttle > 1) this.throttle = 1;
	},
	goInReverse: function () {
		this.throttle -= this.acceleration / 2;
		if (this.throttle < -0.5) this.throttle = -0.5;
	},
	slowDown: function () {
		if (this.throttle >= 0.01) {
			this.throttle -= this.acceleration;
		} else if (this.throttle <= -0.01) {
			this.throttle += this.acceleration;
		} else {
			this.throttle = 0;
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