(function() {
	"use strict";
	MapExpress.Data.RasterProvider = MapExpress.Data.MapSourceProvider.extend({

		initialize : function (imageUrl,bounds,options) {
			MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
			L.setOptions(this, options);
			this._imageUrl = imageUrl;
			this._bounds = bounds;
		},
		
		
		getMapImageUrl: function (mapBounds, mapSize) {
			return this._imageUrl;
		},
		
		getImageBounds :function () {
			return this._bounds;
		}
		
	});
	
	MapExpress.Data.rasterProvider = function (imageUrl, options) {
		return new MapExpress.Data.RasterProvider(imageUrl, options);
	};
	
}).call(this);