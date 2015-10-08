(function() {
	"use strict";
	MapExpress.Data.RasterProvider = MapExpress.Data.MapSourceProvider.extend({

		initialize : function (imageUrl,options) {
			MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
			L.setOptions(this, options);
			this._imageUrl = imageUrl;
		},
		
		
		getMapImageUrl: function (mapBounds, mapSize) {
			return this._imageUrl;
		}
		
	});
	
	MapExpress.Data.rasterProvider = function (imageUrl, options) {
		return new MapExpress.Data.RasterProvider(imageUrl, options);
	};
	
}).call(this);