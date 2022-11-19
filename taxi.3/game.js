var Config = {
	sourceFileName: "small-city.json",
	width: 1200,
	height: 600
};

window.onload = function () {    
    Crafty.init(Config.width, Config.height);
		
	Crafty.scene("Load");
};

