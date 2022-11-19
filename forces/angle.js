(function () {
	var RADIANS_PER_DEGREE = 0.0174532925199433; // Math.PI/180;
	function DegreesToRadians (n) { return n * RADIANS_PER_DEGREE; }	
	function RadiansToDegrees (n) { return n / RADIANS_PER_DEGREE; }
	
	function Angle(valueInRadians) {
		this._value = valueInRadians;
	}
	
	Angle.InRadians = function (n) {
		return new Angle(n);
	}
	Angle.InDegrees = function (n) {
		return Angle.InRadians(DegreesToRadians(this));
	}
	
	Number.prototype.degrees = function () {
		return Angle.InDegrees(this);
	}
	Number.prototype.radians = function () {
		return Angle.InRadians(this);
	}
	
	Angle.prototype.valueInRadians = function () { return this._value; }
	Angle.prototype.valueInDegrees = function () { return RadiansToDegrees(this._value); }
	
	Angle.prototype
	
	
	
})();



