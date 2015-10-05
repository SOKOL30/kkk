(function() {
	"use strict";
	L.MapExpress.Layers.WmsTiledLayer = L.MapExpress.Layers.TileServiceLayer.extend ({

		initialize: function (wmsProvider, options) {
			L.MapExpress.Layers.TileServiceLayer.prototype.initialize.call(this,null,options);
			this.wmsProvider = wmsProvider;
		},
		
		getTileImage: function (coords) {
			return this.wmsProvider.getMapImageByTile(coords);
		}

	});
	
	
	L.MapExpress.Layers.wmsTiledLayer = function (wmsProvider, options) {
		return new L.MapExpress.Layers.WmsTiledLayer(wmsProvider, options);
	};	
	
}).call(this);