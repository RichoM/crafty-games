
Crafty.scene("Main", function () {
	var source = MAP_SOURCE;
	
	map = Crafty.e("2D, Canvas, TiledMapBuilder")
		.createWorld(source);
	car = Crafty.e("Car");
	camera = Crafty.e("Camera")						
		.keepWithinBounds({
			top: 0,
			left: 0,
			right: source.width * source.tilewidth,
			bottom: source.height * source.tileheight
		})
		.follow(car, {x: Config.width / 2, y: Config.height / 2});
		
	fps = Crafty.e("2D, DOM, Text, FPS")
		.attr({maxValues:10})
		.textColor("#FF0000")
		.bind("MessureFPS",function(fps){
			document.title = "FPS: "+ fps.value; //Display Current FPS
			this.text(document.title);
		});
	camera.attach(fps);
});