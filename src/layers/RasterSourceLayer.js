(function() {
	"use strict";
	L.MapExpress.Layers.RasterSourceLayer = L.ImageOverlay.extend({

		initialize: function(rasterProvider, bounds, options) {
			this._rasterProvider = rasterProvider;
			var url = this._rasterProvider.getMapImageUrl(this._bounds, this._map.getSize());
			L.ImageOverlay.prototype.initialize.call(this, url, bounds, options);
		}
	});

	L.MapExpress.Layers.rasterSourceLayer = function(rasterProvider, bounds, options) {
		return new L.MapExpress.Layers.RasterSourceLayer(rasterProvider, bounds, options);
	};

}).call(this);