
window.onload = (function() {	
    var WIDTH = 500,
        HEIGHT = 500;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
	
	Crafty.sprite("imgs/Tank1.png", { GreenTank_sprite: [0, 0, 85, 109]});
	Crafty.sprite("imgs/Tank2.png", { RedTank_sprite: [0, 0, 85, 109]});
	Crafty.sprite("imgs/explosion.png", { Explosion_sprite: [0, 0, 91, 79]});
	
	// Tank
	Crafty.c("Tank", {
		speed: 2,
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Keyboard, Collision, Motion, Shooting");
			this.attr({x: 0, y: 0, w: 85, h: 109})
				.origin(42, 73)
				.shooting("Projectile",
						5,
						{x: 0, y: -70})
				.collision([33, 0], [49, 0], [83, 45], [84, 104], [44, 108], [1, 105], [0, 48])
				.onHit("Tank", function(evt) {
					evt[0].obj.explode();
					this.explode();
				});
		},
		explode: function () {
			this.destroy();
			Crafty.e("Explosion")
				.setCenter({
					x: this._origin.x + this.x,
					y: this._origin.y + this.y					
				});
		}
	});
	
	// Projectile
	Crafty.c("Projectile", {
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Color, Collision");
			this.color("#000000");
			this.w = 6;
			this.h = 6;			
			this.bind("EnterFrame", this.step)
				.onHit("Tank", function (evt) {
					var tank = evt[0].obj;
					if (this.shooter && tank == this.shooter) {
						return;
					}
					tank.explode();
					this.selfdestruct();
				});
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
				.setCenter(this.center);
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
		.setBounds({left: 0, top: 0, right: WIDTH, bottom: HEIGHT})
		.attr({z: -10});
	
	green_tank = Crafty.e("Tank, GreenTank_sprite")
		.setCenter(background.center)
		.setRight(WIDTH / 2 - 10)
		.turn(-90)
		.bind("KeyDown", function () {			
			if (this.isDown('SPACE')) {
				this.shoot();
			}
		})
		.bind("EnterFrame", function () {	
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
					
			if (this.isDown('SPACE')) {
				this.shoot();
			}
		});
		
	red_tank = Crafty.e("Tank, RedTank_sprite")		
		.setCenter({x: WIDTH / 2, y: HEIGHT / 2})
		.setLeft(WIDTH / 2 + 10)
		.turn(90)
		.bind("KeyDown", function () {
			if (this.isDown('SPACE')) {
				this.shoot();
			}						
		})
		.bind("EnterFrame", function () {	
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
			if (this.isDown('SPACE')) {
				this.shoot();
			}
		});
	
	background.attach(red_tank);
	background.attach(green_tank);
	
});

