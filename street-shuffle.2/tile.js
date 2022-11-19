var tiles = undefined;
function BuildTilesFrom(map) {
	var layerName = "Movibles";
	var layer = map.getLayerFromSource(layerName);
	tiles = layer.data.slice();
	tiles.moving = false;
	tiles.at = function (r, c) {
		return this[c + (r * layer.width)];	
	};
	tiles.atPut = function (r, c, tile) {
		this[c + (r * layer.width)] = tile;
	};
	tiles.positionOf =  function (tile) {
		for (var r = 0; r < layer.height; r++) {
			for (var c = 0; c < layer.width; c++) {
				if (this.at(r, c) === tile)
					return [r, c];
			}
		}
	};
	tiles.neighboursOf = function (tile) {
		var tilePos = this.positionOf(tile);
		var nPos = [[-1, 0],
					[0, 1],
					[1, 0],
					[0, -1]];
		return nPos.map(function (each) {
			return tiles.at(each[0] + tilePos[0], each[1] + tilePos[1]);
		});	
	};
	for (var r = 0; r < layer.height; r++) {
		for (var c = 0; c < layer.width; c++) {
			var tile = map.getTile(layerName, r + 1, c + 1);
			var tileData = layer.data[c + (r * layer.width)];
			if (typeof tile !== "number") {
				tiles.atPut(r, c, tile);
				tile.addComponent("Tile");
				if (tileData === 9) {
					tile.removeComponent(map.getRenderMethod());
					tile.empty = true;
				} else {
					tile.empty = false;
				}
			} else {
				tiles.atPut(r, c, undefined);
			}
		}
	}
}

Crafty.c("Tile", {
	init: function () {
		this.addComponent("Mouse, Tween, Bounds");
		this.attr({w: 60, h: 60})
			.bind("Click", this.handleClick);
	},
	handleClick: function () {
		if (tiles.moving) return;
		if (Crafty.math.withinRange(car.center.x, this.left, this.right) &&
			Crafty.math.withinRange(car.center.y, this.top, this.bottom))
			return;
		var neighbours = this.getNeighbours();
		for (var i = 0; i < neighbours.length; i++) {
			var neighbour = neighbours[i];
			if (neighbour && neighbour.empty) {
				this.switchPlacesWith(neighbour);
				return;
			}
		}
	},
	getNeighbours: function () {
		return tiles.neighboursOf(this);
	},
	switchPlacesWith: function (tile) {
		var t1index = tiles.indexOf(this);
		var t2index = tiles.indexOf(tile);
		tiles[t1index] = tile;
		tiles[t2index] = this;
		
		// Animate		
		tiles.moving = true;
		tile.tween({x: this.x, y: this.y}, 10);
		this.tween({x: tile.x, y: tile.y}, 10);
		this.bind("TweenEnd", function () {
			tiles.moving = false;
			this.unbind("TweenEnd");
		})
	}
});
