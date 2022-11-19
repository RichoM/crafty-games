/** 
* Utility method to keep an entity inside its parent.
*/
function keepInsideParent (entity) {
	if (entity.parent) {
		var parent = entity.parent;
		if (entity.top < parent.top) {
			entity.top = parent.top;
		} else if (entity.bottom > parent.bottom) {
			entity.bottom = parent.bottom;
		}
		if (entity.left < parent.left) {
			entity.left = parent.left;
		} else if (entity.right > parent.right) {
			entity.right = parent.right;
		}
	}
}

window.onload = (function() {
    var WIDTH = 800,
        HEIGHT = 600;
    // Initialize Crafty
    Crafty.init();   
	
	// Ball
	Crafty.c("Ball", {
		vx: 4,
		vy: 2,	
		color: "#FFFFFF",
		ready: true,
		init: function() {
			this.addComponent("2D, Canvas, Bounds, Collision");
			this.x = WIDTH / 2;
			this.y = HEIGHT / 2;
			this.w = 20;
			this.h = 20;
			this.collision(new Crafty.circle(this.w / 2, this.h / 2, this.w / 2))
				.onHit("Paddle", function (evt) { 
					this.bounce(evt[0].obj);
				})
				.bind("EnterFrame", this.step)
				.bind("Draw", this.customDraw);
		},
		step: function () {
			this.x += this.vx;
			this.y += this.vy;			
			var parent = this.parent;
			if (!parent) return;
			if (this.top <= parent.top || this.bottom >= parent.bottom) {
				this.vy *= -1;
			}
			if (this.left <= parent.left) {
				rightScore.points += 1;
				this.restart();
			}
			if (this.right >= parent.right) {
				leftScore.points += 1;
				this.restart();
			}
			keepInsideParent(this);
		},
		bounce: function (paddle) {
			if ((this.vx > 0 && this.center.x < paddle.center.x)
				|| (this.vx < 0 && this.center.x > paddle.center.x)) {
				this.vx *= -1;
				this.vy = (this.center.y - paddle.center.y) / 20 * Math.abs(this.vx / 2);
			} else {
				this.vy *= -1;
			}
			keepInsideParent(this);
		},
		customDraw: function (evt) {
			var center = this.center;
			evt.ctx.fillStyle = this.color;
			evt.ctx.beginPath();			
			evt.ctx.arc(center.x, center.y, this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
		},
		restart: function () {
			this.center = this.parent.center;
			this.vx *= 1.1;
			if (this.vx >= 10) { this.vx = 10; }
			this.vy = Crafty.math.randomInt(Math.abs(this.vx) * -1, Math.abs(this.vx));
		}
	});
	
	// Paddle
	Crafty.c("Paddle", {
		speed: 5,
		color: "#FFFFFF",
		ready: true,
		init: function() {
			this.addComponent("2D, Canvas, Bounds");
			this.w = 15;
			this.h = 100;
			this.bind("Draw", this.customDraw);
		},		
		followBall: function (ball) {			
			if (ball.center.y < this.top) this.y -= this.speed;
			if (ball.center.y > this.bottom) this.y += this.speed;
		},
		customDraw: function (evt) {
			evt.ctx.fillStyle = this.color;
			
			evt.ctx.fillRect(this.x, this.y + this.w / 2, this.w, this.h - this.w);
			
			var center = this.center;
			evt.ctx.beginPath();		
			evt.ctx.arc(center.x, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
			evt.ctx.beginPath();
			evt.ctx.arc(center.x, this.bottom - (this.w / 2), this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
		}
	});
	
	// Score
	Crafty.c("Score", {
		points: 0,
		init: function () {
			this.addComponent("2D, Canvas, Text");
			this.textColor("#000000")
				.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
				.bind("EnterFrame", this.update)
				.update();
		},
		update: function () {
			this.text(this.points.toString());
		}
	});
	
	// Create entities
	background = Crafty.e("2D, Canvas, Bounds, Color, Draggable")		
		.attr({x: 0, y: 50, w: WIDTH, h: HEIGHT - 50})		
		.color("#000000");
	ball = Crafty.e("Ball")	
	leftPaddle = Crafty.e("Paddle")
		.setCenter({x: 30, y: HEIGHT / 2})
		.bind("EnterFrame", function () {
				this.followBall(ball);
				keepInsideParent(this);
		});	
	rightPaddle = Crafty.e("Paddle, Multiway")
		.setCenter({x: WIDTH - 30, y: HEIGHT / 2})
		.multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90})
		.bind("EnterFrame", function () { keepInsideParent(this); });	
	
	leftScore = Crafty.e("Score")
		.attr({x: leftPaddle.x, y: background.top - 20});		
	rightScore = Crafty.e("Score")
		.attr({x: rightPaddle.x, y: background.top - 20});
	
	// Camera
	camera = Crafty.e("Camera");						
		//.keepWithinBounds(mapBounds); 
	camera.follow(ball);
	
	// Attach to background
	background.attach(ball);
	background.attach(leftPaddle);
	background.attach(rightPaddle);
	background.attach(leftScore);
	background.attach(rightScore);
	
	
	/*window.onmousemove = function (evt) {
		rightPaddle.setCenter({x: rightPaddle.getCenter().x, y: evt.y});		
		keepInsideParent(rightPaddle);		
	}*/
});

