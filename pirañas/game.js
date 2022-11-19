
window.onload = function () {
    Crafty.init();
	
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
		var source = MAP_SOURCE;
		
		// Map
		map = Crafty.e("2D, Canvas, TiledMapBuilder")
			.createWorld(source);
			/*.attr({
				w: source.width * source.tilewidth,
				h: source.height * source.tileheight
			});*/
		
		// Player
		player = Crafty.e("Player")
			.color(9)
			.setCenter({
				x: source.width * source.tilewidth / 2, 
				y: source.height * source.tileheight / 2
			});
		//map.attach(player);
		
		// Camera
		camera = Crafty.e("Camera")						
			/*.keepWithinBounds({
				top: 0,
				left: 0,
				right: 3300,//map.w,
				bottom: 3300,//map.h
			})*/
			.follow(player);
			
		// FPS
		fps = Crafty.e("2D, DOM, Text, FPS")
			.attr({x: camera.x + 10, y: camera.y + 10, maxValues: 10})
			.textColor("#FF0000")
			.bind("MessureFPS",function(fps){
				document.title = "FPS: "+ fps.value;
				this.text(document.title);
			});
		camera.attach(fps);
		
		// Score
		score = Crafty.e("Score")
			.textColor("#FFFFFF")
			.setTop(camera.y + 80)
			.setRight(camera.x + camera.w - 40);
			/*.bind("EnterFrame", function () {
				this.right = camera.w - 40;
			});*/
		camera.attach(score);
			
		// Max score
		maxScore = Crafty.e("2D, DOM, Bounds, Text")
			.textFont({family: 'Arial' , size: '30px', weight: 'bold' })
			.textColor("#000000")
			.setTop(camera.y + 40)
			.setRight(camera.x + camera.w - 40)
			.bind("EnterFrame", function () {
				//this.right = camera.w - 40;
				this.text(score.max().toString());
			});
		camera.attach(maxScore);
		
		// Bots
		for (var i = 0; i < 50; i++) {
			var car = Crafty.e("Car")
				.color(i % 9)
				.attr({
					x: Math.random() * source.width * source.tilewidth, 
					y: Math.random() * source.height * source.tileheight,
					maxSpeed: Math.random() * 20 + 10, 
					maxTurn: Math.random() * 20 + 15			
				})
				.bind("EnterFrame", function () {
					this.accelerate();
					var p = new Vector({
						x: player.center.x,
						y: player.center.y
					});
					var t = new Vector({
						x: this.center.x,
						y: this.center.y
					});
					var angle = (t.angleTo(p) / (Math.PI/180)) % 360;
					if (angle < 0) angle += 360;
					var rot = (this.rotation - 90) % 360; 
					if (rot < 0) rot += 360;
					if (Math.abs(rot - angle) >= 45) {
						if (rot < angle)
							this.steerRight();
						else
							this.steerLeft();
					}
				});
			//map.attach(car);
		}
		
	});
	
	
	Crafty.scene("Load");
};

