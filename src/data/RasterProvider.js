L.MapExpress.Data.RasterProvider = L.MapExpress.Data.MapSourceProvider.extend({

	initialize : function (imageUrl,options) {
		L.setOptions(this, options);
		this._imageUrl = imageUrl;
    },
	
	getMapImageUrl: function (mapBounds, mapSize) {
		return _imageUrl;
	}
	
});