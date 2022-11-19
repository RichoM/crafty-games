
Crafty.c("MarkFollower", {
	currentMark: undefined,
	markCount: 0,
	init: function () {
		this.requires("Collision");
		this.onHit("Mark", this.hitMark);
	},
	hitMark: function (data) {
		for (var i = 0; i < data.length; i++) {
			var mark = data[i].obj;
			if (this.currentMark === undefined)
				this.currentMark = mark.first();
			if (this.currentMark.number === mark.number) {
				this.markCount++;
				this.currentMark = mark.next();
			}
		}
	},
	resetMarkCount: function () {
		this.markCount = 0;
		this.currentMark = undefined;
	}
});