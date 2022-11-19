
window.onload = (function() {	
    Crafty.init(600, 600);   
	
	Crafty.c("Solid", {
		init: function () {
			this.addComponent("2D, Canvas, Color, Collision");
			this.color("#000000")
				.collision();
		}
	});
	
	Crafty.c("Player", {
		direction: [0, 0],
		speed: 10,
		init: function () {
			this.addComponent("2D, Canvas, Color, Collision, Keyboard");
			this.color("#CF8500")
				.bind("EnterFrame", function () {
					this.x += this.direction[0];
					this.y += this.direction[1];
				})
				.attr({w: 20, h: 20})
				.collision([[0,0],[0,20],[20,20],[20,0]])
				.onHit("Solid", function () {
					this.x -= this.direction[0];
					this.y -= this.direction[1];
					this.direction = [0, 0];
				})
				.bind("KeyDown", function () {
					if (this.direction[0] === 0 && this.direction[1] === 0) {
						if (this.isDown('LEFT_ARROW'))
							this.direction = [-this.speed, 0];
						else if (this.isDown('RIGHT_ARROW'))
							this.direction = [this.speed, 0];
						else if (this.isDown('UP_ARROW'))
							this.direction = [0, -this.speed];
						else if (this.isDown('DOWN_ARROW'))
							this.direction = [0, this.speed];
					}						
				});
		}		
	});
	

	
	Crafty.e("Player")
		.attr({x: 200, y: 200});
	
	Crafty.e("Solid")
		.attr({x: 0, y: 0, w: 30, h: 600});	
	Crafty.e("Solid")
		.attr({x: 0, y: 0, w: 600, h: 30});
	Crafty.e("Solid")
		.attr({x: 600 - 30, y: 0, w: 30, h: 600});	
	Crafty.e("Solid")
		.attr({x: 0, y: 600 - 30, w: 600, h: 30});
});

