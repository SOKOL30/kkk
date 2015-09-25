L.MapExpress.Layers.WmsLayer = L.ImageOverlay.extend ({
	
	options: {
		opacity: 1,
		alt: '',
		interactive: false
	},
	
	initialize: function (wmsProvider, options) {
		
		options = L.setOptions(this, options);
		
		this.wmsProvider = wmsProvider;
		
	},
	
	
	_reset: function () {
		var map = this._map;
		
		this._image = this.wmsProvider.getImageByTile()
		image.src = this.wmsProvider.getImageUrl(map.getBounds(),map.getSize());
		
		var  bounds = new L.Bounds(
		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
		    size = bounds.getSize();

		L.DomUtil.setPosition(image, bounds.min);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	}
	
	
});