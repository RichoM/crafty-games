
window.onload = function () {
	var WIDTH = 1200,
		HEIGHT = 600;
    Crafty.init(WIDTH, HEIGHT);
	
	// Load scene
	Crafty.scene("Load", function() {
		Crafty.background("#000000");
		Crafty.e("2D, DOM, Text")		
			.attr({x: 10, y: 10})
			.textColor("#FFFFFF")
			.text("Loading...");
			
		//Preload sprites first
		Crafty.load(["imgs/cars.png",
					"imgs/city-tileset.PNG"], function() { 	 
			Crafty.sprite("imgs/cars.png", {
				Car0_sprite:[0, 0, 33, 55],
				Car1_sprite:[33, 0, 33, 55],
				Car2_sprite:[66, 0, 33, 55],
				Car3_sprite:[99, 0, 33, 55],
				Car4_sprite:[132, 0, 33, 55],
				Car5_sprite:[165, 0, 33, 55],
				Car6_sprite:[198, 0, 33, 55],
				Car7_sprite:[231, 0, 33, 55],
				Car8_sprite:[264, 0, 33, 55],
				Car9_sprite:[297, 0, 33, 55]
			});
			Crafty.scene("Main");
		});  				
	});
	
	// Main scene
	Crafty.scene("Main", function () {
		var source = MAP_SOURCE,
			mapBounds = {
				top: 0,
				left: 0,
				right: source.width * source.tilewidth,
				bottom: source.height * source.tileheight
			};
		
		// Map
		map = Crafty.e("2D, Canvas, TiledMapBuilder")
			.createWorld(source);
		
		// Player
		player = Crafty.e("Player")
			.color(9)
			.keepWithinBounds(mapBounds);
		
		// Camera
		camera = Crafty.e("Camera")						
			.keepWithinBounds(mapBounds)
			.follow(player, {x: WIDTH / 2, y: HEIGHT / 2});
			
		// FPS
		fps = Crafty.e("2D, DOM, Text, FPS")
			.attr({x: 10, y: 10, maxValues:10})
			.textColor("#FF0000")
			.bind("MessureFPS",function(fps){
				document.title = "FPS: "+ fps.value;
				this.text(document.title);
			});
		camera.attach(fps);
		
		// Bots
		/*player.bind("KeyDown", function () {
		if (this.isDown('R')) {*/
		for (var i = 0; i < 270 * 2; i++) {
			var car = Crafty.e("Car")
				.color(i % 9)
				.keepWithinBounds(mapBounds)
				.attr({
					xx: player.x + (i % 20) * 33,
					x: player.x + (i % 20) * 33,
					y: player.y + (i / 20) * 55,
					rotation: 0,
					maxSpeed: 5
				})
				/*.attr({
					x: Math.random() * source.width * source.tilewidth, 
					y: Math.random() * source.height * source.tileheight,
					maxSpeed: Math.random() * 10 + 5, 
					maxTurn: Math.random() * 20 + 15			
				})*/
				.bind("EnterFrame", function () {
					this.accelerate();
					this.y = this.y  < -50 ? (260 / 20) * 55: this.y;
					this.x = this.xx + Math.sin(this.y / 100) * 75;
					/*var p = new Vector(player.center);
					var t = new Vector(this.center);
					var angle = (t.angleTo(p) / (Math.PI/180)) % 360;
					if (angle < 0) angle += 360;
					var rot = (this.rotation - 90) % 360; 
					if (rot < 0) rot += 360;
					if (Math.abs(rot - angle) >= 45) {
						if (rot < angle)
							this.steerRight();
						else
							this.steerLeft();
					}*/
				});
		}
		//});
	});
	
	
	Crafty.scene("Load");
};

