(function() {
	"use strict";
	MapExpress.Layers.WmsImageOverlayLayer = L.ImageOverlay.extend ({

		initialize: function (wmsProvider, options) { 
			this._wmsProvider = wmsProvider;
			L.setOptions(this, options);
		},
		
		getEvents: function () {
			var events = {
				zoom: this._reset,
				viewreset: this._reset,
				moveend: this._reset,
				load: this._onImageLoad
			};

			if (this._zoomAnimated) {
				events.zoomanim = this._animateZoom;
			}

			return events;
		},
		
		_reset: function () {
			this._updateImage();
			L.ImageOverlay.prototype._reset.call(this);
		},
		
		_updateImage: function() {
			L.DomUtil.remove(this._image);
			if (this.options.interactive) {
				this.removeInteractiveTarget(this._image);
			}
			
			this._bounds = this._map.getBounds();
			this._url = this._wmsProvider.getMapImageUrl (this._bounds, this._map.getSize());
			
			this._initImage();
			//L.DomEvent.on(this._image, 'load', L.bind(this._onImageLoad, this));
			
			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
			if (this.options.interactive) {
				L.DomUtil.addClass(this._image, 'leaflet-interactive');
				this.addInteractiveTarget(this._image);
			}
			this.getPane().appendChild(this._image);
		},
		
		_onImageLoad: function() {
			
		}
		
		
	});
	
	MapExpress.Layers.wmsImageOverlayLayer = function (wmsProvider, options) {
		return new MapExpress.Layers.WmsImageOverlayLayer(wmsProvider, options);
	};
	
}).call(this);