
var Vector = (function () {
	var RADIANS_PER_DEGREE = Math.PI/180;
	function DegreesToRadians (n) { return n * RADIANS_PER_DEGREE; }	
	function RadiansToDegrees (n) { return n / RADIANS_PER_DEGREE; }
	function CloseTo (n1, n2) {
		if (n1 === n2) { return true; }
		if (n1 === 0) { return Math.abs(n2) < 0.0001; }
		if (n2 === 0) { return Math.abs(n1) < 0.0001; }
		if (isNaN(n1) !== isNaN(n2)) { return false; }
		if (isFinite(n1) !== isFinite(n2)) { return false; }
		var fuzz = Math.max(Math.abs(n1), Math.abs(n2)) * 0.0001;
		return Math.abs(n1 - n2) <= fuzz;
	}

	function Vector (spec) {
		if (arguments.length === 0) {
			this._x = 0;
			this._y = 0;
		} else if (arguments.length === 1) {
			if (spec.x != undefined && spec.y != undefined) {
				this._x = spec.x;
				this._y = spec.y;
			} else if (spec.magnitude != undefined) {
				var angle = 0;
				if (spec.degrees != undefined) {
					angle = DegreesToRadians(spec.degrees);
				} else if (spec.radians != undefined) {
					angle = spec.radians;
				}
				var o = Math.sin(angle) * spec.magnitude;
				var a = Math.cos(angle) * spec.magnitude;
				this._x = a;
				this._y = o;
			} else {
				throw new Error ("Invalid spec");
			}
		} else if (arguments.length === 2) {
			this._x = arguments[0];
			this._y = arguments[1];
		} else {
			throw new Error ("Too many arguments");
		}
	}
	
	Vector.prototype.x = function (val) {
		if (val !== undefined) { 
			return new Vector({
				x: val, 
				y: this._y
			});
		}
		return this._x;
	};
	
	Vector.prototype.y = function (val) {
		if (val !== undefined) { 
			return new Vector({
				x: this._x, 
				y: val
			});
		}
		return this._y;
	};
	
	Vector.prototype.magnitude = function (val) {
		if (val !== undefined) {
			return new Vector({
				magnitude: val,
				radians: this.radians()
			});
		}
		return Math.sqrt(this._x * this._x + this._y * this._y);
	};
	
	Vector.prototype.radians = function (val) {
		if (val !== undefined) {
			return new Vector({
				magnitude: this.magnitude(),
				radians: val
			});
		}
		return (new Vector(1, 0)).radiansBetween(this);
	};
	
	Vector.prototype.degrees = function (val) {
		if (val !== undefined) {
			return this.radians(DegreesToRadians(val));
		}
		return RadiansToDegrees(this.radians());
	};
	
	Vector.prototype.magnitudeSq = function () {
		return this._x * this._x + this._y * this._y;
	}
	
	Vector.prototype.add = function (vector) {
		return new Vector({
			x: this._x + vector.x(),
			y: this._y + vector.y()
		});
	};
	
	Vector.prototype.subtract = function (vector) {
		return new Vector({
			x: this._x - vector.x(),
			y: this._y - vector.y()
		});
	};
	
	Vector.prototype.radiansBetween = function (vector) {
		return Math.atan2(this._x * vector.y() - this._y * vector.x(),
						this._x * vector.x() + this._y * vector.y());
	};
	
	Vector.prototype.radiansTo = function (vector) {
		return Math.atan2(vector.y() - this._y, vector.x() - this._x);
	};
	
	Vector.prototype.degreesBetween = function (vector) {
		return RadiansToDegrees(this.radiansBetween(vector));
	};
	
	Vector.prototype.degreesTo = function (vector) {
		return RadiansToDegrees(this.radiansTo(vector));
	};
	
	Vector.prototype.clone = function () { 
		return new Vector(this._x, this._y); 
	};
	
	Vector.prototype.distance = function (vector) {
		return Math.sqrt((vector.x() - this._x) * (vector.x() - this._x) + (vector.y() - this._y) * (vector.y() - this._y));
	};
	
	Vector.prototype.distanceSq = function (vector) {
        return (vector.x() - this._x) * (vector.x() - this._x) + (vector.y() - this._y) * (vector.y() - this._y);
    };
	
	Vector.prototype.divide = function (vector) {
		return new Vector({
			x: this._x / vector.x(),
			y: this._y / vector.y()
		});
	};
	
	Vector.prototype.dotProduct = function (vector) {
		return this._x * vector.x() + this._y * vector.y();
	};
	
	Vector.prototype.equals = function (vector) {
		return vector instanceof Vector &&
            this._x == vector.x() && this._y == vector.y();
	};
	
	Vector.prototype.closeTo = function (vector) {
		return vector instanceof Vector &&
            CloseTo(this._x, vector.x()) && CloseTo(this._y, vector.y());
	};
	
	Vector.prototype.normal = function (vector) {
		if (vector === undefined) {
			return new Vector(-this._y, this._x);
		}
		return (new Vector(vector.y() - this._y, this._x - vector.x())).normalize();
	};
	
	Vector.prototype.isZero = function () {
		return this._x === 0 && this._y === 0;
	};
	
	Vector.prototype.closeToZero = function () {
		return CloseTo(this._x, 0) && CloseTo(this._y, 0);
	};
	
	Vector.prototype.multiply = function (vector) {
		return new Vector({
			x: this._x * vector.x(),
			y: this._y * vector.y()
		});
	};
	
	Vector.prototype.negated = function () {
		return new Vector({
			x: -this._x,
			y: -this._y
		});
	};
	
	Vector.prototype.normalized = function() {
        var lng = Math.sqrt(this._x * this._x + this._y * this._y);
        if (lng === 0) {
			return new Vector(1, 0);
        } else {
			return new Vector(this._x / lng, this._y / lng);
        }
    };
	
	Vector.prototype.scaled = function (scalarX, scalarY) {
        if (scalarY === undefined)
            scalarY = scalarX;
		return new Vector({
			x: this._x * scalarX,
			y: this._y * scalarY
		});
    };
	
    Vector.prototype.translated = function(dx, dy) {
        if (dy === undefined)
            dy = dx;
		
		return new Vector({
			x: this._x + dx,
			y: this._y + dy
		});
    };
	
	Vector.tripleProduct = function (a, b, c) {
		var ac = a.dotProduct(c);
		var bc = b.dotProduct(c);
		return new Vector(b._x * ac - a._x * bc, b._y * ac - a._y * bc);
	};
	
	Vector.prototype.multiplyMagnitude = function (n) {
		return this.magnitude(this.magnitude() * n);
	};
	
	Vector.prototype.toString = function () {
		return "Vector(" + this._x + ", " + this._y + ")";
	};
	
	return Vector;
})();