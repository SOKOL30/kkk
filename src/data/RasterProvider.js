(function() {
	"use strict";
	L.MapExpress.Data.RasterProvider = L.MapExpress.Data.MapSourceProvider.extend({

		initialize : function (imageUrl,options) {
			L.MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
			L.setOptions(this, options);
			this._imageUrl = imageUrl;
		},
		
		
		getMapImageUrl: function (mapBounds, mapSize) {
			return _imageUrl;
		}
		
	});
	
	L.MapExpress.Data.rasterProvider = function (imageUrl, options) {
		return new L.MapExpress.Data.RasterProvider(imageUrl, options);
	};
	
}).call(this);