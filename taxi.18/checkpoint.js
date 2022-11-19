
Crafty.c("Checkpoint", {
	shared: {},
	number: 0,
	_next: undefined,
	init: function () {	
		this.addComponent("Bounds, Collision");
		this.collision();
		this.removeComponent("Canvas");
	},
	first: function () {
		if (this.shared.first !== undefined) return this.shared.first;
		var list = [];
		Crafty("Checkpoint").each(function () { if (this.number === 0) list.push(this); });
		
		this.shared.first = this.avg(list);
		return this.shared.first;
	},
	count: function () {
		if (this.shared.count !== undefined) return this.shared.count;
		var c = 0;
		Crafty("Checkpoint").each(function () {
			if (this.number > c) c = this.number;
		});
		this.shared.count = c + 1;
		return this.shared.count;
	},
	next: function () {
		if (this._next) return this._next;
		
		var that = this,
			nextNumber = (this.number + 1) % this.count(),
			list = [];
		Crafty("Checkpoint").each(function () {
			if (this.number === nextNumber)
				list.push(this);
		});
		
		return this.avg(list);
	},
	avg: function (list) {
		var avgx = 0, avgy = 0;
		for (var i = 0; i < list.length; i++) {
			avgx += list[i].x;
			avgy += list[i].y;
		}
		avgx /= list.length;
		avgy /= list.length;
		
		var closest = undefined,
			closestdist = undefined;
		for (var j = 0; j < list.length; j++) {
			var e = list[j];
			var d = Crafty.math.squaredDistance(e.x, e.y, avgx, avgy);
			if (closest === undefined ||
				d < closestDist) {
				closest = e;
				closestDist = d;
			}
		}
		this._next = closest;
		return closest;
	}
});


Crafty.c("CheckpointFollower", {
	lastCheckpoint: undefined,
	nextCheckpoint: undefined,
	init: function () {
		this.requires("Collision");
		this.onHit("Checkpoint", this._hitCheckpoint);
		this.nextCheckpoint = Crafty("Checkpoint").first()
	},
	_hitCheckpoint: function (data) {
		for (var i = 0; i < data.length; i++) {
			var checkpoint = data[i].obj;
			/*if (this.nextCheckpoint === undefined)
				this.nextCheckpoint = checkpoint.first();*/
			if (this.nextCheckpoint.number === checkpoint.number) {
				this.lastCheckpoint = this.nextCheckpoint;
				this.nextCheckpoint = checkpoint.next();
				this.trigger("Checkpoint", checkpoint);
			} else {
				this.trigger("WrongCheckpoint", checkpoint);
			}
		}
	}
});