(function() {
	"use strict";
	MapExpress.Layers.RasterSourceLayer = L.ImageOverlay.extend({

		initialize: function(rasterProvider, bounds, options) {
			this._rasterProvider = rasterProvider;
			var url = this._rasterProvider.getMapImageUrl(bounds, this._map.getSize());
			L.ImageOverlay.prototype.initialize.call(this, url, bounds, options);
		}
	});

	MapExpress.Layers.rasterSourceLayer = function(rasterProvider, bounds, options) {
		return new MapExpress.Layers.RasterSourceLayer(rasterProvider, bounds, options);
	};

}).call(this);