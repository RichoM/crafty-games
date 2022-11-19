window.onload = (function() {
    var WIDTH = 800,
        HEIGHT = 600;
    // Initialize Crafty
    Crafty.init(window.width, window.height);   
			
	Crafty.c("Bounds", {
		init: function() {
			this.requires("2D");			
		},
		getCenter: function () {
			return {
				x: this.x + (this.w / 2),
				y: this.y + (this.h / 2)
			}
		},
		setCenter: function (center) {
			this.x = center.x - this.w / 2;
			this.y = center.y - this.h / 2;
			return this;
		},
		getBounds: function () {
			return {
				top: this.getTop(),
				bottom: this.getBottom(),
				left: this.getLeft(),
				right: this.getRight()
			}
		},
		getTop: function () {
			return this.y;
		},
		getBottom: function () {
			return this.y + this.h;
		},
		getLeft: function () {
			return this.x;
		},
		getRight: function () {
			return this.x + this.w;
		},
		setTop: function (top) {
			this.y = top;
			return this;
		},
		setBottom: function (bottom) {
			this.y = bottom - this.h;
			return this;
		},
		setLeft: function (left) {
			this.x = left;
			return this;
		},
		setRight: function (right) {
			this.x = right - this.w;
			return this;
		},
		keepInsideParent: function () {
			var bounds = this.getBounds();
			var parentBounds = this.parent.getBounds();
			if (bounds.top < parentBounds.top) {
				this.setTop(parentBounds.top);
			}
			if (bounds.bottom > parentBounds.bottom) {
				this.setBottom(parentBounds.bottom);
			}
			if (bounds.left < parentBounds.left) {
				this.setLeft(parentBounds.left);
			}
			if (bounds.right > parentBounds.right) {
				this.setRight(parentBounds.right);
			}
		}
	});
	
	// Ball
	Crafty.c("Ball", {
		vx: 4,
		vy: 2,	
		color: "FFF",
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
			var bounds = this.getBounds();
			var parentBounds = this.parent.getBounds();
			if (bounds.top <= parentBounds.top || bounds.bottom >= parentBounds.bottom) {
				this.vy *= -1;
			}
			if (bounds.left <= parentBounds.left) {
				rightScore.points += 1;
				this.restart();
			}
			if (bounds.right >= parentBounds.right) {
				leftScore.points += 1;
				this.restart();
			}
			this.keepInsideParent();
		},
		bounce: function (paddle) {
			var center = this.getCenter();
			var paddleCenter = paddle.getCenter();
			if ((this.vx > 0 && center.x < paddleCenter.x)
				|| (this.vx < 0 && center.x > paddleCenter.x)) {
				this.vx *= -1;
				this.vy = (center.y - paddleCenter.y) / Math.abs(this.vx * 1.1);//10;
			} else {
				this.vy *= -1;
			}
			this.keepInsideParent();
		},
		customDraw: function (evt) {
			var center = this.getCenter();
			evt.ctx.fillStyle = this.color;
			evt.ctx.beginPath();			
			evt.ctx.arc(center.x, center.y, this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
		},
		restart: function () {
			this.setCenter(this.parent.getCenter());
			this.vx *= 1.1;
			if (this.vx >= 10) { this.vx = 10; }
			this.vy = Crafty.math.randomInt(Math.abs(this.vx) * -1, Math.abs(this.vx));
		}
	});
	
	// Paddle
	Crafty.c("Paddle", {
		speed: 5,
		color: "FFF",
		ready: true,
		init: function() {
			this.addComponent("2D, Canvas, Bounds");
			this.w = 15;
			this.h = 100;
			this.bind("Draw", this.customDraw);
		},		
		followBall: function (ball) {
			var ballCenter = ball.getCenter();
			if (ballCenter.y < this.getTop()) this.y -= this.speed;
			if (ballCenter.y > this.getBottom()) this.y += this.speed;
		},
		customDraw: function (evt) {
			evt.ctx.fillStyle = this.color;
			
			evt.ctx.fillRect(this.x, this.y + this.w / 2, this.w, this.h - this.w);
			
			var center = this.getCenter();
			evt.ctx.beginPath();		
			evt.ctx.arc(center.x, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
			evt.ctx.beginPath();
			evt.ctx.arc(center.x, this.getBottom() - (this.w / 2), this.w / 2, 0, Math.PI * 2, false);
			evt.ctx.fill();
			evt.ctx.closePath();
		}
	});
	
	// Score
	Crafty.c("Score", {
		points: 0,
		init: function () {
			this.addComponent("2D, Canvas, Text");
			this.textColor("000000")
				.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
				.bind("EnterFrame", this.update)
				.update();
		},
		update: function () {
			this.text(this.points.toString());
		}
	});
	
	// Create entities
	background = Crafty.e("2D, Canvas, Bounds, Color")		
		.attr({x: 0, y: 50, w: WIDTH, h: HEIGHT - 50})		
		.color("000");
	ball = Crafty.e("Ball");
	leftPaddle = Crafty.e("Paddle")
		.setCenter({x: 30, y: HEIGHT / 2})
		.bind("EnterFrame", function () {
				this.followBall(ball);
				this.keepInsideParent();
		});
	rightPaddle = Crafty.e("Paddle, Multiway")
		.setCenter({x: WIDTH - 30, y: HEIGHT / 2})
		.multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90})
		.bind("EnterFrame", function () { this.keepInsideParent(); });
	leftScore = Crafty.e("Score")
		.attr({x: leftPaddle.x, y: background.getTop() - 20});		
	rightScore = Crafty.e("Score")
		.attr({x: rightPaddle.x, y: background.getTop() - 20});
	
	
	
	// Attach to background
	background.attach(ball);
	background.attach(leftPaddle);
	background.attach(rightPaddle);
	background.attach(leftScore);
	background.attach(rightScore);
	
	
	window.onmousemove = function (evt) {
		//rightPaddle.setCenter({x: rightPaddle.getCenter().x, y: evt.y});
		//background.setCenter(evt);
		rightPaddle.keepInsideParent();
	}
});

