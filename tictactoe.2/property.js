Crafty.c("Property", {
	property: function (spec) {
		if(Crafty.support.setter) {
			// Use __defineSetter__ and __defineGetter__
			if (spec.setter)
				this.__defineSetter__(spec.name, spec.setter);
			this.__defineGetter__(spec.name, spec.getter);
		} else if (Crafty.support.defineProperty) {
			//IE9 supports Object.defineProperty
			if (spec.setter) {
				Object.defineProperty(this, spec.name, {
					set: spec.setter,
					get: spec.getter,
					configurable: true
				});
			} else {
				Object.defineProperty(this, spec.name, {						
					get: spec.getter,
					configurable: true
				});
			}
		} else {
			// If no setters and getters are supported (e.g. IE8)
			throw new Error("Properties not supported in this browser");
		}
	},
});