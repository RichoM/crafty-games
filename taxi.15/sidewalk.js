Crafty.c("Sidewalk", {
	rumbling: 0.3,
	type: undefined,
	init: function () {	
		this.addComponent("Bounds, Collision")
			.collision();
			
	},
	rumble: function (car) {
		var m = Math.min(this.rumbling * car.previous.magnitude(), 5),
			attr = undefined;
						
			if (this.type === "vertical") attr = "x";
			else if (this.type === "horizontal") attr = "y";
			else if (this.type === "corner") return;
			else if (this.type === "sand") attr = undefined;
			else throw new Error("Invalid sidewalk type");
			
			if (attr) {
				if (Crafty.frame() % 4 < 2)
					car[attr] += m;
				else
					car[attr] -= m;	
			}
			// Slow it down a little
			car.previous = car.previous.subtract(car.previous.multiplyMagnitude(0.1));
	}
});