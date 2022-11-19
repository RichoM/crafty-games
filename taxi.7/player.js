
Crafty.c("Player", {
	speed: 0,
	acceleration: 0.015,
	maxSpeed: 10,
	steering: 0,
	steeringSpeed: 2,
	maxSteeringSpeed: 30,
	init: function () {
		this.addComponent("Car, Keyboard")
			.bind('EnterFrame', this.drive);
	},
	drive: function () {
	
		var right = this.isDown('RIGHT_ARROW'),
			left = this.isDown('LEFT_ARROW'),
			up = this.isDown('UP_ARROW'),
			down = this.isDown('DOWN_ARROW'),
			space = this.isDown('SPACE');
					
		if (space) { // Brake
			this.speed *= 0.75;
		} else if (up) { // Accelerate
			this.speed += this.acceleration;
		} else if (down) { // Go in reverse
			this.speed -= this.acceleration * 0.8;
		} else { // Decelerate
			if (this.speed >= 0.01) {
				this.speed -= this.acceleration;
			} else if (this.speed <= -0.01) {
				this.speed += this.acceleration;
			} else {
				this.speed = 0;
			}
		}
		
		if (Math.abs(this.speed) > 0) {
			if (left) {
				if (this.steering > 0) this.steering = 0;
				this.steering -= this.steeringSpeed;
			} else if (right) {
				if (this.steering < 0) this.steering = 0;
				this.steering += this.steeringSpeed;
			} else {
				this.steering = 0;
			}
		}
		
		if (Math.abs(this.steering) > this.maxSteeringSpeed) {
			this.steering = this.maxSteeringSpeed * (this.steering > 0 ? 1 : -1);
		}
		
		if (this.speed > 1) this.speed = 1;
		if (this.speed < -1) this.speed = -1;
		
		// Move		
		this.forward(this.speed * this.maxSpeed);
		this.turn(this.speed * this.steering / 10);
		
	}
});			
	