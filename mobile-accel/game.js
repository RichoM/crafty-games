
window.onload = function () {
	var WIDTH = 1200,
		HEIGHT = 600;
    Crafty.init(WIDTH, HEIGHT);
	
	text = Crafty.e("2D, DOM, Text")
		.attr({x: 10, y: 10, w: WIDTH})
		.textColor("#000000")
		.text("Si podés leer esto significa que el evento no se está ejecutando :(");
		
	Crafty.device.deviceMotion(function (data) {
		text.text(Math.round(data.tiltLR));
		//console.log('data.moAccel : '+data.rawAcceleration+', data.moCalcTiltLR : '+Math.round(data.tiltLR)+', data.moCalcTiltFB : '+Math.round(data.tiltFB)+'');
	});
};

