(function() {
	L.MapExpress.Data.RasterProvider = L.MapExpress.Data.MapSourceProvider.extend({

		initialize : function (imageUrl,options) {
			// TODO: Везде разобраться с вызовом конструктора с null
			L.MapExpress.Data.MapSourceProvider.prototype.initialize.call(null,options);
			L.setOptions(this, options);
			this._imageUrl = imageUrl;
		},
		
		// TODO: По хорошему надо не урл, а картинку возвращать, как в WmsProvider
		getMapImageUrl: function (mapBounds, mapSize) {
			return _imageUrl;
		}
		
	});
	
	L.MapExpress.Data.rasterProvider = function (imageUrl, options) {
		return new L.MapExpress.Data.RasterProvider(imageUrl, options);
	};
	
}).call(this);