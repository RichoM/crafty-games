
Crafty.c("Car", {
	speed: 0,
	acceleration: 0.015,
	maxSpeed: 10,
	turnSpeed: 2,
	maxTurnSpeed: 30,
	steering: 0,
	camera: undefined,
	init: function () {
		this.addComponent("2D, Canvas, Keyboard, Bounds, Car_sprite")
			.origin(16, 40)
			.attr({w: 33, h: 55, rotation: 90})
			.attr({x: 150 - 16, y: 150 - 40})					
			.bind('EnterFrame', this.step);							
	},
	step: function () {
	
		var right = this.isDown('RIGHT_ARROW'),
			left = this.isDown('LEFT_ARROW'),
			up = this.isDown('UP_ARROW'),
			down = this.isDown('DOWN_ARROW');
			
		if (up) {
			this.speed += this.acceleration;
		} else if (down) {
			this.speed -= this.acceleration;
		}
		
		if (this.speed != 0) {
			if (left) {
				this.steering -= this.turnSpeed;
			} else if (right) {
				this.steering += this.turnSpeed;
			}
		}
		
		if ((left && this.steering > 0)
			|| (right && this.steering < 0)
			|| !(left || right)) {
			this.steering = 0;
		}
		if (Math.abs(this.steering) > this.maxTurnSpeed) {
			this.steering = this.maxTurnSpeed * (this.steering > 0 ? 1 : -1);
		}
		
		if (this.speed >= 0.01) {
			this.speed -= (this.acceleration / 3);
		} else if (this.speed <= -0.01) {
			this.speed += (this.acceleration / 3);
		} else {
			this.speed = 0;
		}
		
		if (this.speed > 1) this.speed = 1;
		if (this.speed < -1) this.speed = -1;
		
		// Forward
		var delta = this.getDelta(this.speed * this.maxSpeed, this.rotation);
		
		// Turn
		this.rotation += this.speed * this.steering / 10;
		this.x += delta.x;
		this.y += delta.y;	
		
	},
	getDelta: function (rho, angle) {
		var radians = angle % 360;
		if (radians > 180) radians -= 360;
		radians = Crafty.math.degToRad(radians - 90);
		
		var dx = Math.cos(radians) * rho;
		var dy = Math.sin(radians) * rho;
		
		return {x: dx, y: dy};
	}
});			
	