Crafty.c('Player', {
  init: function() {
    this.addComponent('2D, Canvas, Color, Fourway, Collision');
	this.color("#4D4D4D")
		.attr({x: 20, y: 20, w: 20, h: 20})
      .bind('KeyDown', function(e) {
        if (!this.onmove) {  // if NOT player on move
          this.onmove = true; // disable keys and set direction
          switch (e.key) {
            case Crafty.keys['LEFT_ARROW']:  this.direction = 1; break;
            case Crafty.keys['RIGHT_ARROW']: this.direction = 2; break;
            case Crafty.keys['UP_ARROW']:    this.direction = 3; break;
            case Crafty.keys['DOWN_ARROW']:  this.direction = 4; break;
	    default: this.direction = 0;
          }
        }
      })
       
      .bind('EnterFrame', function () { // start moving until player hits something Solid   
        switch (this.direction) {
		  case 0: this.attr({x: this.x, y:this.y});  break;
          case 1: this.x -= this.direction; break;
          case 2: this.x += this.direction; break;
          case 3: this.y -= this.direction; break;
          case 4: this.y += this.direction; break;
        }
      })


      // I want this function to stop the movement
      // and enable the keys again
      .onHit('Solid', function() {
         this.onmove = false;
         this.direction = 0;
         // now await next keyDown
      })

  },
});



window.onload = function () {
    Crafty.init();
	// Load scene
	Crafty.scene("Load", function() {
		Crafty.background("#000000");
		Crafty.e("Player");
	});
	Crafty.scene("Load");
};
	
