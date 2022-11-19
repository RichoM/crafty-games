
window.onload = (function() {	
    var WIDTH = 1200,
        HEIGHT = 600;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);   
	
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
			this.tween({alpha: 0.0}, 25);
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
			});
		}
	});
	
	// Obstacle
	Crafty.c("Obstacle", {		
		init: function () {
			this.addComponent("2D, Canvas, Color, Bounds, Collision");
			this.color("#CF8500")				
				.bind("EnterFrame", this.step)
				.attr({w: 30, h: 150})
				.collision()
				.origin("center");
		},
		step: function () {
			this.x -= airplane.hSpeed;			
			if (!this.parent) return;
			if (this.right <= this.parent.left) {
				this.left = this.parent.right;
				this.center = {
					x: this.center.x,
					y: Crafty.math.randomInt(this.parent.top, this.parent.bottom)
				};
				airplane.hSpeed += 0.2;
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
			var text = this.points.toString();
			var max = localStorage.maxScore2;
			if (max === undefined) max = 0;
			if (this.points > max) {
				localStorage.maxScore2 = this.points;
				this.textColor("#DD0000");
			}
			this.text(text);
		}
	});
	
	// Create entities	
	background = Crafty.e("2D, Canvas, Color, Bounds")
		.color("#00AADE")
		.setBounds({left: 0, top: 0, right: WIDTH, bottom: HEIGHT});
		
	score = Crafty.e("Score")
		.textColor("#FFFFFF")
		.setTop(background.top + 80)
		.bind("EnterFrame", function () {
			this.right = background.right - 40;
		});
	background.attach(score);
		
	maxScore = Crafty.e("2D, Canvas, Bounds, Text")
		.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
		.textColor("#000000")
		.setTop(background.top + 40)
		.bind("EnterFrame", function () {
			this.right = background.right - 40;
			if (localStorage.maxScore2) {
				this.text(localStorage.maxScore2.toString());
			}
		});
	background.attach(maxScore);
			
	obstacle1 = Crafty.e("Obstacle")
		.setCenter(background.center)		
		.bind("EnterFrame", function (e) { 
			if (airplane.hSpeed == 0 || !this.parent) return;
			if (!this.random) this.random = Crafty.math.randomInt(0, 1000);
			this.center = {
				x: this.center.x,
				y: Math.sin(Math.sin((Crafty.frame()+ this.random)/(50)) ) * HEIGHT / 2 + HEIGHT / 2
			};
			if (this.center.x > this.parent.right)
				this.random = Crafty.math.randomInt(0, 1000);
		});
	background.attach(obstacle1);
	
	obstacle2 = Crafty.e("Obstacle")
		.setCenter({
			x: background.left + 150,
			y: background.bottom - background.h / 4
		})
		.bind("EnterFrame", function (e) { 
			if (airplane.hSpeed == 0 || !this.parent) return;
			if (!this.random) this.random = 50;//Crafty.math.randomInt(0, 1000);
			this.center = {
				x: this.center.x,
				y: Math.sin(Math.sin((Crafty.frame()+ this.random)/(50)) ) * HEIGHT / 2 + HEIGHT / 2
			};
			if (this.center.x > this.parent.right)
				this.random = Crafty.math.randomInt(0, 1000);
		});
	background.attach(obstacle2);
	
	obstacle3 = Crafty.e("Obstacle")
		.setCenter({
			x: background.right - 150,
			y: background.top + background.h / 4
		})
		.bind("EnterFrame", function (e) { 
			if (airplane.hSpeed == 0 || !this.parent) return;
			if (!this.random) this.random = Crafty.math.randomInt(0, 1000);
			this.center = {
				x: this.center.x,
				y: Math.sin(Math.sin((Crafty.frame()+ this.random)/(50)) ) * HEIGHT / 2 + HEIGHT / 2
			};
			if (this.center.x > this.parent.right)
				this.random = Crafty.math.randomInt(0, 1000);
		});
	background.attach(obstacle3);
	
	airplane = Crafty.e("Airplane")
		.setCenter({x: 150, y: 300});
	background.attach(airplane);
	
	
});

