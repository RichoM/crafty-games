
window.onload = (function() {	
    // Initialize Crafty
    Crafty.init();   
	
	Crafty.sprite("imgs/paper-airplane.small.png", { airplane_sprite: [0, 0, 109, 43]});
	
	// Airplane
	Crafty.c("Airplane", {
		gravity: 0.3,
		hSpeed: 5,
		vSpeed: -10,
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Keyboard, Collision, Tween, airplane_sprite");
			this.bind("EnterFrame", this.step);
			this.bind("EnterFrame", this.checkParentBounds);
			this.origin("center");
			this.collision(new Crafty.polygon([0,0],[107,28],[17,41]));
			this.onHit("Obstacle", function (evt) {				
				this.bounce(evt[0].obj);
			});
		},
		step: function () {	
			score.points += 1;
			this.y += this.vSpeed;
			this.vSpeed += this.gravity;
			this.rotation = this.vSpeed * 3.5;	
			if (this.rotation < -80) this.rotation = -80;
			if (this.rotation > 80) this.rotation = 80;
			if (this.isDown('SPACE') ||
				this.isDown('UP_ARROW')) {
				this.vSpeed -= 0.8;
			}
		},
		checkParentBounds: function () {
			if (!this.parent) return;			
			if (this.center.y <= this.parent.top ||
				this.center.y >= this.parent.bottom) {
				this.bounce();
			}
		},
		bounce: function (obstacle) {
			this.unbind("EnterFrame", this.step);
			this.unbind("EnterFrame", this.checkParentBounds);
			this.hSpeed = 0;
			this.tween({alpha: 0.0}, 50);
			var vx = 0, vy = 0;
			if (obstacle) {
				var center = this.center;
				var obstacleCenter = obstacle.center;
				vx = center.x >= obstacleCenter.x ?	1 : -1;
				vy = center.y >= obstacleCenter.y ? 1 : -1;
			}
			this.bind("EnterFrame", function () {
				this.x += vx;
				this.y += vy;
				vy += (this.gravity / 10);
				this.rotation -= vx * vy;
				if (this.alpha === 0.0) this.destroy();
			});
		}
	});
	
	// Obstacle
	Crafty.c("Obstacle", {		
		init: function () {
			this.addComponent("2D, Canvas, Color, Bounds, Collision");
			this.color("#CF8500")				
				.bind("EnterFrame", this.step)
				.attr({w: 50, h: 50})
				.collision()
				.origin("center");
		},
		step: function () {
			this.x -= airplane.hSpeed;
			
			if (this.right <= camera.left) {
				this.left = camera.right;
				this.center = {
					x: this.center.x,
					y: Crafty.math.randomInt(camera.top, camera.bottom )
				};
			}
			if (this.bottom <= camera.top - 50) {
				this.top = camera.bottom;
			} else if (this.top >= camera.bottom + 50) {
				this.bottom = camera.top;
			}
			
		}
	});
	
	// Score
	Crafty.c("Score", {
		points: 0,
		init: function () {
			this.addComponent("2D, Canvas, Bounds, Text");
			this.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
				.bind("EnterFrame", this.update)
				.update();
		},
		update: function () {		
			airplane.hSpeed += 0.009;
			var text = this.points.toString();
			var max = localStorage.maxScore4;
			if (max === undefined) max = 0;
			if (this.points > max) {
				localStorage.maxScore4 = this.points;
				this.textColor("#DD0000");
			}
			this.text(text);
		}
	});
	
	// Create entities	
	Crafty.background("#00AADE");
		
	airplane = Crafty.e("Airplane")
		.setCenter({x: 150, y: 300});
			
	camera = Crafty.e("Camera, Bounds");
	camera.follow(airplane, {x: camera.w * -0.4, y: 0});
	
	
	score = Crafty.e("Score")
		.textColor("#FFFFFF")
		.setTop(80)
		.bind("EnterFrame", function () {
			this.right = camera.right - 40;
		});
	camera.attach(score);
		
	maxScore = Crafty.e("2D, Canvas, Bounds, Text")
		.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
		.textColor("#000000")
		.setTop(40)
		.bind("EnterFrame", function () {
			this.right = camera.right - 40;
			this.text(localStorage.maxScore4.toString());
		});
	camera.attach(maxScore);
			
	for (var i = 0; i < 20; i++) {
		Crafty.e("Obstacle")
			.setCenter({
				x: Crafty.math.randomInt(airplane.right + 150, camera.center.x + camera.w),
				y: Crafty.math.randomInt(camera.top - camera.h, camera.bottom + camera.h)
			})
			.bind("EnterFrame", (function () {
				var ii = i;
				return function () {
					this.rotation += (ii % 2 === 0 ? 50 : -50);
				};
			})());
	}
	
});

