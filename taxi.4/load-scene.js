
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