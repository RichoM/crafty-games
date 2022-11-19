
window.onload = function () {
	var WIDTH = 1200,
		HEIGHT = 600;
    Crafty.init();
	
	fps = Crafty.e("2D, DOM, Text, FPS")
		.attr({x: 10, y: 10, maxValues: 10})
		.textColor("#FF0000")
		.bind("MessureFPS",function(fps){
			document.title = "FPS: "+ fps.value;
			this.text(document.title);
		});
	
	Crafty.sprite("imgs/car.2.png", {
		Car_sprite:[0,0, 33, 55]
	});
			
	Crafty.c("InertialCar", {
		previous: new Vector(),
		forwardDist: 0,
		turnAngle: 0,
		init: function () {			
			var sprite = Crafty.assets["imgs/car.2.png"];
			this.addComponent("2D, Canvas, Keyboard, Bounds, Car_sprite")
				.origin(16, 40)
				.attr({w: sprite.width, h: sprite.height})
				.attr({x: 150 - 16, y: 150 - 40})
				.attr({rotation: 90})
				.bind("EnterFrame", this.step)
				.bind("EnterFrame", this.keys);
		},
		forward: function (dist) {
			this.forwardDist += dist / 2;
		},
		turn: function (angle) {
			this.rotation += angle;
		},
		keys: function () {
			var right = this.isDown('RIGHT_ARROW'),
				left = this.isDown('LEFT_ARROW'),
				up = this.isDown('UP_ARROW'),
				down = this.isDown('DOWN_ARROW');
						
			if (up) {
				this.forward(1);
			} else if (down) {
				this.forward(-0.5);
			}
			if (left) {
				this.turn(-4);
			} else if (right) {
				this.turn(4);
			}
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
				previous = previous.magnitude(previous.magnitude() * 0.9);
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
	
	car = Crafty.e("InertialCar");
};

