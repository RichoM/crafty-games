// Shooting
Crafty.c("Shooting", {
	bullet: undefined,
	bulletSpeed: 1,
	bulletOrigin: {x: 0, y: 0},
	init: function () {
		this.requires("2D");
	},
	shooting: function (bullet, bulletSpeed, bulletOrigin) {
		this.bullet = bullet;
		if (arguments.length >= 2) {
			if (arguments.length == 3) {
				this.bulletOrigin = bulletOrigin;
			}
			this.bulletSpeed = bulletSpeed;
		}
		return this;
	},
	getRotatedBulletOrigin: function () {		
		var dx = this.bulletOrigin.x;
		var dy = this.bulletOrigin.y;
		var magnitude = Math.sqrt(dx * dx + dy * dy);
		if (magnitude == 0) return {x: 0, y: 0};
		var angle = Math.atan2(dy,dx);
		angle += Crafty.math.degToRad(this.rotation);
				
		var o = Math.sin(angle) * magnitude;
		var a = Math.cos(angle) * magnitude;
		return {
			x: a,
			y: o
		};
	},
	newBullet: function () {
		var b = Crafty.e(this.bullet);		
		var rbo = this.getRotatedBulletOrigin();
		var center = {
			x: this._origin.x + this._x + rbo.x,
			y: this._origin.y + this._y + rbo.y
		};
		b.origin("center");
		b.x = center.x - (b.w / 2);
		b.y = center.y - (b.h / 2);
		b.rotation = this.rotation;
		if (this.parent) {
			this.parent.attach(b);
		}
		b.z = this.z - 1;
		b.shooter = this;
		return b;
	},
	getDelta: function (dist) {
		var rho = dist;
		var radians = this.rotation % 360;
		if (radians > 180) radians -= 360;
		radians = Crafty.math.degToRad(radians - 90);
		
		var dx = Math.cos(radians) * rho;
		var dy = Math.sin(radians) * rho;
		
		return {x: dx, y: dy};
	},
	shoot: function (speed) {			
		var bullet = this.newBullet();			
		var delta = this.getDelta(speed ? speed : this.bulletSpeed);
		
		bullet.bind("EnterFrame", function () {
			this.x += delta.x;
			this.y += delta.y;
		});
		return this;
	}
});
	