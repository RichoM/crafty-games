
window.onload = (function() {	
    var WIDTH = 500,
        HEIGHT = 500;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
	
	Crafty.sprite("imgs/Tank1.png", { GreenTank_sprite: [0, 0, 85, 109]});
	Crafty.sprite("imgs/explosion.png", { Explosion_sprite: [0, 0, 91, 79]});
	
	// Tank
	Crafty.c("Tank", {
		speed: 2,
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Keyboard, Collision, Motion, Shooting");
			this.attr({x: 250 - 85/2, y: 250 - 109/2, w: 85, h: 109})
				.origin(42, 73)
				.shooting("Projectile",
						5,
						{x: 0, y: -70})
				.bind("EnterFrame", this.step);				
		},
		step: function () {
			for (var i = 0; i < 5; i++) {
			//this.turn(Crafty.math.randomInt(-25, 25));			
			this.turn(5);
			this.shoot();
			}
		}
	});
	
	// Projectile
	Crafty.c("Projectile", {
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Color, Collision");
			this.color("#000000");
			this.w = 6;
			this.h = 6;			
			this.bind("EnterFrame", this.step);
		},
		step: function () {
			var parent = this.parent;
			if (!parent) return;
			
			if (!this.within(parent.x, parent.y, parent.w, parent.h)) {
				this.selfdestruct();
			}
		},
		selfdestruct: function () {
			this.destroy();
			Crafty.e("Explosion")
				.attr({
					x: this.x - (91/2) + 3,
					y: this.y - (79/2) + 3
				});
		}
	});
	
	// Explosion
	Crafty.c("Explosion", {
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Tween, Explosion_sprite");
			this.tween({alpha: 0.0}, 25);			
			this.bind("EnterFrame", function () { if (this.alpha === 0.0) this.destroy(); });
		}		
	});
	
	// Create entities
	background = Crafty.e("2D, Canvas, Color, Bounds")
		.color("#A8AAAE")
		.attr({x: 0, y: 0, w: WIDTH, h: HEIGHT})
		.attr({z: -10});
	
	tank = Crafty.e("Tank");
	background.attach(tank);
	
});

