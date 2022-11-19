
Crafty.c("Car", {
	gray: "rgba(128,128,128,255)",
	yellow: "rgba(255,255,0,255)",
	leftSensorOnStreet: function () {
		var color = this.colorAt(this.getSensorPosition(-3,-8));
		return color == this.gray || color == this.yellow;
	},
	rightSensorOnStreet: function () {
		var color = this.colorAt(this.getSensorPosition(3,-8));
		return color == this.gray || color == this.yellow;
	},
	speed: 1,
	init: function () {
		var sprite = Crafty.assets["imgs/car.png"];
		this.addComponent("2D, Canvas, Keyboard, Bounds, Motion, Draggable, Car_sprite")
			.attr({w: sprite.width, h: sprite.height})
			.origin("center")
			.setCenter({x: 23, y: 149.5})
			.attr({rotation: 90})
			.bind("EnterFrame", this.step);
		//leftSensor = Crafty.e("2D, Canvas, Color").attr({x:0, y: 0, w: 20, h: 20});
		//rightSensor = Crafty.e("2D, Canvas, Color").attr({x:20, y: 0, w: 20, h: 20});
	},
	step: function () {
		this.forward(this.speed * 0.25);
		if (!this.leftSensorOnStreet()) this.turn(this.speed);
		if (!this.rightSensorOnStreet()) this.turn(this.speed * -1);
		/*leftSensor.color(this.leftSensor());
		rightSensor.color(this.rightSensor());*/
		/*leftSentor.color(this.colorAt({
			x: this.center.x + -5,
			y: this.center.y + -8
			}));*/
		if (this.isDown('RIGHT_ARROW')) {
			this.turn(this.speed);
		} else if (this.isDown('LEFT_ARROW')) {
			this.turn(this.speed * -1);
		}
		if (this.isDown('UP_ARROW')) {
			this.forward(this.speed);
		} else if (this.isDown('DOWN_ARROW')) {
			this.forward(this.speed * -1);
		}
	},
	colorAt: function (point) {
		var imgData = Crafty.canvas.context.getImageData(point.x, point.y, 1, 1);
		return "rgba(" + 
			imgData.data[0] + 
			"," + 
			imgData.data[1] +
			"," + 
			imgData.data[2] +
			"," + 
			imgData.data[3] +
			")";
	},
	getSensorPosition: function (dx, dy) {
		var magnitude = Math.sqrt(dx * dx + dy * dy);
		if (magnitude == 0) return {x: 0, y: 0};
		var angle = Math.atan2(dy,dx);
		angle += Crafty.math.degToRad(this.rotation);
				
		var o = Math.sin(angle) * magnitude;
		var a = Math.cos(angle) * magnitude;
		return {
			x: this._origin.x + this._x + a,
			y: this._origin.y + this._y + o
		};
	}/*,
	leftSensor: function () {
		return this.colorAt(this.getSensorPosition(-3,-8));
	},
	rightSensor: function () {
		return this.colorAt(this.getSensorPosition(3,-8));
	}*/
});			
	