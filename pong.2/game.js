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
    Crafty.init(window.width, window.height);   
	
	Crafty.c("Property", {
		property: function (spec) {
			if(Crafty.support.setter) {
				// Use __defineSetter__ and __defineGetter__
				if (spec.setter)
					this.__defineSetter__(spec.name, spec.setter);
				this.__defineGetter__(spec.name, spec.getter);
			} else if (Crafty.support.defineProperty) {
				//IE9 supports Object.defineProperty
				if (spec.setter) {
					Object.defineProperty(this, spec.name, {
						set: spec.setter,
						get: spec.getter,
						configurable: true
					});
				} else {
					Object.defineProperty(this, spec.name, {						
						get: spec.getter,
						configurable: true
					});
				}
			} else {
				// If no setters and getters are supported (e.g. IE8)
				this[spec.name] = spec.getter();
				if (spec.setter) {
					// If a setter is specified update it when the property is changed
					this.bind("EnterFrame", function () {					
						if (this[spec.name] !== spec.getter()) {
							spec.setter(spec.name);
						}
					});
				} else {
					// If no setter is specified update the property if the value changed
					this.bind("EnterFrame", function () {
						var current = spec.getter();
						if (this[spec.name] !== current) {
							this[spec.name] = current;
						}
					});
				}
			}
		},
	});
	
	Crafty.c("Bounds", {
		init: function() {
			this.requires("2D, Property");
			this.defineProperties();
		},		
		defineProperties: function () {
			// center, bounds, top, bottom, left, right
			this.property({
				name: "center",
				setter: function (v) { this.setCenter(v); },
				getter: function () { return this.getCenter(); }
			});
			this.property({
				name: "bounds",
				setter: function (v) { this.setBounds(v); },
				getter: function () { return this.getBounds(); }
			});
			this.property({
				name: "top",
				setter: function (v) { this.setTop(v); },
				getter: function () { return this.getTop(); }
			});
			this.property({
				name: "bottom",
				setter: function (v) { this.setBottom(v); },
				getter: function () { return this.getBottom(); }
			});
			this.property({
				name: "left",
				setter: function (v) { this.setLeft(v); },
				getter: function () { return this.getLeft(); }
			});
			this.property({
				name: "right",
				setter: function (v) { this.setRight(v); },
				getter: function () { return this.getRight(); }
			});
		},
		
		// Actual methods
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
			var parent = this.parent;
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
				this.vy = (this.center.y - paddle.center.y) / Math.abs(this.vx * 1.1);//10;
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
		color: "FFF",
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
	background = Crafty.e("2D, Canvas, Bounds, Color, Draggable")		
		.attr({x: 0, y: 50, w: WIDTH, h: HEIGHT - 50})		
		.color("000");
	ball = Crafty.e("Ball");
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
	
	
	
	// Attach to background
	background.attach(ball);
	background.attach(leftPaddle);
	background.attach(rightPaddle);
	background.attach(leftScore);
	background.attach(rightScore);
	
	
	window.onmousemove = function (evt) {
		rightPaddle.setCenter({x: rightPaddle.getCenter().x, y: evt.y});
		keepInsideParent(rightPaddle);		
	}
});

