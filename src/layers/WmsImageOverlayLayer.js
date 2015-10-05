(function() {
	L.MapExpress.Layers.WmsImageOverlayLayer = L.MapExpress.Layers.RasterLayer.extend ({

		initialize: function (wmsProvider, options) { 
			this._wmsProvider = wmsProvider;
			L.MapExpress.Layers.RasterLayer.prototype.initialize.call(this,this._wmsProvider,options);
		},
		
		getMapImageUrl: function () {
			this._bounds = this._map.getBounds();
			return this._wmsProvider.getMapImageUrl (this._bounds, this._map.getSize());
		}
	});
	
	L.MapExpress.Layers.wmsImageOverlayLayer = function (wmsProvider, options) {
		return new L.MapExpress.Layers.WmsImageOverlayLayer(wmsProvider, options);
	};
	
}).call(this);