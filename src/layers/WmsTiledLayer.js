L.MapExpress.Layers.WmsTiledLayer = L.MapExpress.Layers.TileServiceLayer.extend ({

	initialize: function (wmsProvider, options) {
		L.MapExpress.Layers.TileServiceLayer.prototype.initialize.call(this,options);
		this.wmsProvider = wmsProvider;
	},
	
	getTileImage: function (coords) {
		return this.wmsProvider.getImageByTile(coords);
	}

});