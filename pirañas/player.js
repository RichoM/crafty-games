
Crafty.c("Player", {
	init: function () {
		this.addComponent("Car, Keyboard, Collision")
			.bind('EnterFrame', this.drive);
	},
	drive: function () {
		var right = this.isDown('RIGHT_ARROW'),
			left = this.isDown('LEFT_ARROW'),
			up = this.isDown('UP_ARROW'),
			down = this.isDown('DOWN_ARROW'),
			space = this.isDown('SPACE');
					
		/*if (space) {
			this.brake();
		} else if (up) {
			this.accelerate();
		} else if (down) {
			this.goInReverse();
		} else {
			this.slowDown();
		}*/
		this.accelerate();
		
		if (left) {
			this.steerLeft();
		} else if (right) {
			this.steerRight();
		} else {
			this.dropSteeringWheel();
		}
		
	}
});			
	