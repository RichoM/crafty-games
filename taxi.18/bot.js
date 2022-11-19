
Crafty.c("Bot", {
	init: function () {
		this.addComponent("Car")
			.bind('EnterFrame', this.drive);
	},
	drive: function () {
		var turn = this.angleToLookAt(this.nextCheckpoint);
		
		this.accelerate();
		if (turn > 0)
			this.steerRight();
		else
			this.steerLeft();
	},
	angleToLookAt: function (entity) {
		var myV = new Vector({magnitude: 1, degrees: this.rotation - 90})
			hisV = new Vector(entity.center.x - this.center.x, entity.center.y - this.center.y);
		return myV.degreesBetween(hisV);
	}
});			
	