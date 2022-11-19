// Vector
Crafty.c("Vector", {
	_initialPoint: {x: 0, y: 0},
	_terminalPoint: {x: 0, y: 0},
	init: function () {
		this.requires("Property");
		this.defineProperties();
	},
	defineProperties: function () {
		this.property({
			name: "initialPoint",
			setter: function (v) { this.setInitialPoint(v); },
			getter: function () { return this.getInitialPoint(); }
		});
		this.property({
			name: "terminalPoint",
			setter: function (v) { this.setTerminalPoint(v); },
			getter: function () { return this.getTerminalPoint(); }
		});
		this.property({
			name: "angle",
			setter: function (v) { this.setAngle(v); },
			getter: function () { return this.getAngle(); }
		});
		this.property({
			name: "magnitude",
			setter: function (v) { this.setMagnitude(v); },
			getter: function () { return this.getMagnitude(); }
		});
	},
	vector: function () {
		/*
			initialPoint, terminalPoint
			terminalPoint
			initialPoint, angle, magnitude
			angle, magnitude
		*/
		function getTerminalPoint (angle, magnitude) {
			var o = Math.sin(angle) * magnitude;
			var a = Math.cos(angle) * magnitude;
			return {
				x: this._initialPoint.x + a,
				y: this._initialPoint.x + o
			};
		}
		if (arguments.length == 1) {
			// terminalPoint
			this._terminalPoint = arguments[0];
		} else if (arguments.length == 2) {
			if (typeof arguments[0] == "number" &&
				typeof arguments[1] == "number") {
				// angle, magnitude
				this._terminalPoint = getTerminalPoint(arguments[0], arguments[1]);
			} else {
				// initialPoint, terminalPoint
				this._initialPoint = arguments[0];
				this._terminalPoint = arguments[1];
			}
		} else if (arguments.length == 3) {
			// initialPoint, angle, magnitude
			this._initialPoint = arguments[0];
			this._terminalPoint = getTerminalPoint(arguments[1], arguments[2]);
		}
		return this;
	},
	
	// Actual methods
	getInitialPoint: function () {
		return this._initialPoint;
	},
	setInitialPoint: function (p) {		
	},
	getTerminalPoint: function () {
		return this._terminalPoint;
	},
	setTerminalPoint: function (p) {
		this._terminalPoint = p;
	},
	getAngle: function () {
	},
	setAngle: function (angle) {
	},
	getMagnitude: function () {
	},
	setMagnitude: function (angle) {
	}	
	
});