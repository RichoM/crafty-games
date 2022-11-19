
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
		var source = MAP_SOURCE,
			mapBounds = {
				top: 0,
				left: 0,
				right: source.width * source.tilewidth,
				bottom: source.height * source.tileheight
			};
		
		// Map
		map = Crafty.e("2D, Canvas, TiledMapBuilder")
			.setMapDataSource(source)
			.createWorld(function (map) {
				/*var entities = map.getLayers()["Sidewalk"];
				for (var i = 0; i < entities.length; i++) {
					var e = entities[i];
					if (e) {
						e.rumbling = parseFloat(e.rumbling);
					}
				}*/
			});
		
		// Player
		player = Crafty.e("Player")
			.color(9)
			.attr({life: 5})
			.setCenter({x: 1700, y: 3500});
		
		// Camera
		camera = Crafty.e("Camera")						
			.keepWithinBounds(mapBounds); 
		camera.follow(player, {x: camera.w / 2, y: camera.h / 2});
			
		// FPS
		fps = Crafty.e("2D, DOM, Text, FPS")
			.attr({x: camera.x + 10, y: camera.y + 10, maxValues: 10})
			.textColor("#FF0000")
			.bind("MessureFPS",function(fps){
				document.title = "FPS: "+ fps.value;
				this.text(document.title);
			});
		camera.attach(fps);
		
		// Bots
		(function () {
			var streets = Crafty("Street");
			for (var i = 0; i < 0; i++) {
				var street = Crafty(streets[Math.floor(Math.random() * streets.length)]);
				var car = Crafty.e("Car")
					.color(i % 9)
					.setCenter({							
						x: street.x + Math.random() * street.w,
						y: street.y + Math.random() * street.h
					})
					.attr({
						rotation: 0
					});
			}		
		})();
	});
	
	
	Crafty.scene("Load");
};

