L.MapExpress.Layers.RasterLayer = L.ImageOverlay.extend ({

	initialize: function (rasterProvider, options) { 
		this._rasterProvider = rasterProvider;
		L.ImageOverlay.prototype.initialize.call(this,null,null,options);
	},
	
	getMapImageUrl: function () {
		this._bounds = this._map.getBounds();
		return this._rasterProvider.getMapImageUrl (this._bounds, this._map.getSize());
	},
	
	getEvents: function () {
		var events = {
			zoom: this._reset,
			viewreset: this._reset,
			moveend: this._reset
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},
	
	_reset: function () {
		
		this._updateImage();
		
		var image = this._image,
		    bounds = new L.Bounds(
		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
		    size = bounds.getSize();

		L.DomUtil.setPosition(image, bounds.min);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
		
	},
	
	_updateImage: function() {
		this._bounds = this._map.getBounds();
		this._url = this.getMapImageUrl ();
		
		L.DomUtil.remove(this._image);
		if (this.options.interactive) {
			this.removeInteractiveTarget(this._image);
		}
		
		this._initImage();
		if (this.options.opacity < 1) {
			this._updateOpacity();
		}
		if (this.options.interactive) {
			L.DomUtil.addClass(this._image, 'leaflet-interactive');
			this.addInteractiveTarget(this._image);
		}
		this.getPane().appendChild(this._image);
		
	}
});