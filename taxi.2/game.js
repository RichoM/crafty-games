var sourceFileName = "small-city.json";

window.onload = (function() {	
    var WIDTH = 1200,
        HEIGHT = 600;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
	
  	Crafty.scene("Load", function() {
  		Crafty.background("#000");		
  		//Preload sprites first
  		Crafty.load(["imgs/car.2.png"], function() {  			 
  			Crafty.sprite("imgs/car.2.png", {
  				 Car_sprite:[0,0, 33, 55]
  			});
			Crafty.scene("Main");
  		});  				
  	});
	
	Crafty.scene("Main", function () {
		map = Crafty.e("2D, Canvas, TiledMapBuilder").createWorld(SOURCE_FROM_TILED_MAP_EDITOR, function (tiledMap) {
					
			var background = tiledMap.getLayer('Background');
			for (var i = 0; i < background.length; i++) {
				var tile = background[i];
				tiledMap.attach(tile);
			}
		
			Crafty.c("Car", {
				speed: 0,
				acceleration: 0.015,
				maxSpeed: 20,
				turnSpeed: 2,
				maxTurnSpeed: 50,
				steering: 0,
				init: function () {
					this.addComponent("2D, Canvas, Bounds, Keyboard, Car_sprite")
						.origin(16, 40)
						.setCenter({x: WIDTH / 2, y: HEIGHT / 2})
						.bind('EnterFrame', this.step);						
						
				},
				step: function () {
					var right = this.isDown('RIGHT_ARROW'),
						left = this.isDown('LEFT_ARROW'),
						up = this.isDown('UP_ARROW'),
						down = this.isDown('DOWN_ARROW');
						
					if (up) {
						this.speed += this.acceleration;
					} else if (down) {
						this.speed -= this.acceleration;
					}
					
					if (this.speed != 0) {
						if (left) {
							this.steering -= this.turnSpeed;
						} else if (right) {
							this.steering += this.turnSpeed;
						}
					}
					
					if ((left && this.steering > 0)
						|| (right && this.steering < 0)
						|| !(left || right)) {
						this.steering = 0;
					}
					if (Math.abs(this.steering) > this.maxTurnSpeed) {
						this.steering = this.maxTurnSpeed * (this.steering > 0 ? 1 : -1);
					}
					
					if (this.speed >= 0.01) {
						this.speed -= (this.acceleration / 3);
					} else if (this.speed <= -0.01) {
						this.speed += (this.acceleration / 3);
					} else {
						this.speed = 0;
					}
					
					if (this.speed > 1) this.speed = 1;
					if (this.speed < -1) this.speed = -1;
					
					// Forward
					var delta = this.getDelta(this.speed * this.maxSpeed, this.rotation);
					/*tiledMap.x -= delta.x;
					tiledMap.y -= delta.y;*/
					
					
					// Turn
					this.rotation += this.speed * this.steering / 10;
					this.x += delta.x;
					this.y += delta.y;
					
					
					Crafty.viewport.x = WIDTH / 2 - this.x;
					Crafty.viewport.y = HEIGHT / 2 - this.y;
					
				},
				getDelta: function (rho, angle) {
					var radians = angle % 360;
					if (radians > 180) radians -= 360;
					radians = Crafty.math.degToRad(radians - 90);
					
					var dx = Math.cos(radians) * rho;
					var dy = Math.sin(radians) * rho;
					
					return {x: dx, y: dy};
				}
			});			
				
			car = Crafty.e("Car");
			Crafty.e("2D, DOM, FPS, Text").attr({maxValues:10})
				.attr({x: 10, y: 10})			
				.bind("MessureFPS",function(fps){
					document.title = "FPS: "+ fps.value; //Display Current FPS
					//console.log(this.values); // Display last x Values
				});
		});
	});
	
	
	
	Crafty.scene("Load");
});

