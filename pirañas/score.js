
// Score
Crafty.c("Score", {
	points: 0,
	init: function () {
		this.addComponent("2D, DOM, Bounds, Text");
		this.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
			.bind("EnterFrame", this.update)
			.update();
	},
	update: function () {
		var text = this.points.toString();
		var max = this.max();
		if (max === undefined) max = 0;
		if (this.points > max) {
			this.max(this.points);
			this.textColor("#DD0000");
		}
		this.text(text);
	},
	max: function (val) {
		if (val !== undefined) {
			localStorage.pirañasMaxScore = val;
			return val;
		} else {
			return localStorage.pirañasMaxScore || 0;
		}
	}
});