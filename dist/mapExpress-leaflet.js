MapExpress = {
    
    Controls: {},
    
    Data:{},
    
    Geo:{},
    
	Layers: {},
	
    Utils:{},
	
	Mapping:{}
};

if(typeof window !== 'undefined' && window.L){
  window.MapExpress = MapExpress;
};;(function() {
	"use strict";
	MapExpress.Data.MapSourceProvider = L.Class.extend({
		
		statics: {
        },
		
		options: {
		},
		
		initialize: function (options) {
			
		},
		
		getFeatureInfo: function (latlng) {
	
		}
	});
	
	MapExpress.Data.mapSourceProvider = function (options) {
		return new MapExpress.Data.MapSourceProvider(options);
	};
	
}).call(this);
;(function() {
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
	
}).call(this);;(function() {
	"use strict";
	MapExpress.Data.TileProvider = MapExpress.Data.MapSourceProvider.extend({

		options : {
			maxZoom: 23,
			subdomains: 'abc'
		},
		
		initialize : function (url, options) {
			MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
			L.setOptions(this, options);
			this._url = url;
			if (typeof this.options.subdomains === 'string') {
				this.options.subdomains = this.options.subdomains.split('');
			}
		},

		getTileImage : function (tileCoord) {
			var tileImage = new Image();
			tileImage.src = this.getTileUrl(tileCoord);
			return tileImage;
		},

		getTileUrl : function (tileCoord) {
			return L.Util.template(this._url, L.extend({
				r: this.options.tileCoord && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
				s: this._getSubdomain(tileCoord),
				x: tileCoord.x,
				y: tileCoord.y,
				z: tileCoord.z
			}, this.options));
		},
		
		_getSubdomain: function (tilePoint) {
			var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
			return this.options.subdomains[index];
		}

	});
	
	MapExpress.Data.tileProvider = function (url, options) {
		return new MapExpress.Data.TileProvider(url, options);
	};
	
}).call(this);
;(function() {
	"use strict";
	MapExpress.Data.WmsProvider = MapExpress.Data.MapSourceProvider.extend({

		defaultWmsParams: {
			service: 'WMS',
			request: 'GetMap',
			version: '1.1.1',
			layers: '',
			styles: '',
			format: 'image/png',
			transparent: false
		},
		
		options: {
			tileSize : 256,
			crs: L.CRS.EPSG3857,
			uppercase: false,
			maxZoom: 23,
			subdomains: 'abc'
		},
		
		initialize : function (url, options) {
			MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
			this._url = url;
			var wmsParams = L.extend({}, this.defaultWmsParams);
			for (var i in options) {
				if (!(i in this.options)) {
					wmsParams[i] = options[i];
				}
			}
			options = L.setOptions(this, options);
			wmsParams.width = wmsParams.height = options.tileSize * (options.detectRetina && L.Browser.retina ? 2 : 1);
			this.wmsParams = wmsParams;
		 },
		
		getTileImage: function (tileCoord) {
			var tileBounds = this._tileCoordsToBounds(tileCoord);
			var tileSize = this.options.tileSize;
			var mapSize = new L.Point(tileSize, this.options.tileSize);		
			return this.getMapImage(tileBounds,mapSize);
		},
		
		getMapImage: function (mapBounds, mapSize) {
			var img = new Image();
			img.src = this.getMapImageUrl(mapBounds, mapSize);
			return img;
		},
		
		getMapImageUrl: function (mapBounds, mapSize) {
			var wmsVersion = parseFloat(this.wmsParams.version);
			var crs = this.options.crs;
			var projectionKey = wmsVersion >= 1.3 ? 'crs' : 'srs';
			var nw = crs.project(mapBounds.getNorthWest());
			var se = crs.project(mapBounds.getSouthEast());

			var params = {
				'width': mapSize.x,
				'height': mapSize.y
			};
			params[projectionKey] = crs.code;
			params.bbox = (
				wmsVersion >= 1.3 && crs === L.CRS.EPSG4326 ?
				[se.y, nw.x, nw.y, se.x] :
				[nw.x, se.y, se.x, nw.y]
			).join(',');

			L.extend(this.wmsParams, params);

			var uppercase = this.options.uppercase || false;
			var pstr = L.Util.getParamString(this.wmsParams, this._url, uppercase);
			return this._url + pstr;
		},
		
		// TODO: См. MapExpress.CoreGIS.OGS.Tms.CoordSys методы PixelPointToProjectedPoint
		_tileCoordsToBounds: function (tileCoord) {
			var tileSize = this.options.tileSize;
			var crs = L.CRS.EPSG3857;
			
			var nwPoint = new L.Point(tileCoord.x * tileSize, tileCoord.y * tileSize);
			var sePoint = new L.Point(nwPoint.x + tileSize, nwPoint.y + tileSize);
			
			var nwUnprojected = crs.pointToLatLng(nwPoint, tileCoord.z);
			var seUnprojected = crs.pointToLatLng(sePoint, tileCoord.z);
			
			var nw = crs.wrapLatLng(nwUnprojected);
			var se = crs.wrapLatLng(seUnprojected);
			return new L.LatLngBounds(nw, se);
		}

	});
	
	MapExpress.Data.wmsProvider = function (url, options) {
		return new MapExpress.Data.WmsProvider(url, options);
	};
	
}).call(this);;(function() {
	"use strict";
	MapExpress.Layers.RasterSourceLayer = L.ImageOverlay.extend({

		initialize: function(rasterProvider, bounds, options) {
			this._rasterProvider = rasterProvider;
			var url = this._rasterProvider.getMapImageUrl(bounds, this._map.getSize());
			L.ImageOverlay.prototype.initialize.call(this, url, bounds, options);
		}
	});

	MapExpress.Layers.rasterSourceLayer = function(rasterProvider, bounds, options) {
		return new MapExpress.Layers.RasterSourceLayer(rasterProvider, bounds, options);
	};

}).call(this);;(function() {	"use strict";	MapExpress.Layers.TileServiceLayer = L.TileLayer.extend ({		initialize: function (tileProvider, options) {			L.TileLayer.prototype.initialize.call(this,null,options);					this.tileProvider = tileProvider;		},				createTile: function (coords, done) {			var tileImage = this.getTileImage(coords);			L.DomEvent.on(tileImage, 'load', L.bind(this._tileOnLoad, this, done, tileImage));			L.DomEvent.on(tileImage, 'error', L.bind(this._tileOnError, this, done, tileImage));			if (this.options.crossOrigin) {				tileImage.crossOrigin = '';			}			tileImage.alt = '';			return tileImage;		},				getTileImage: function (coords) {			return this.tileProvider.getTileImage(coords);		}	});		MapExpress.Layers.tileServiceLayer = function (tileProvider, options) {		return new MapExpress.Layers.TileServiceLayer(tileProvider, options);	};}).call(this);;(function() {
	"use strict";
	MapExpress.Layers.WmsImageOverlayLayer = L.ImageOverlay.extend ({

		initialize: function (wmsProvider, options) { 
			this._wmsProvider = wmsProvider;
			L.ImageOverlay.prototype.initialize.call(this,null,null,options);
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
			L.ImageOverlay.prototype._reset.call(this);
		},
		
		_updateImage: function() {
			this._bounds = this._map.getBounds();
			this._url = this._wmsProvider.getMapImageUrl (this._bounds, this._map.getSize());
			
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
	
	MapExpress.Layers.wmsImageOverlayLayer = function (wmsProvider, options) {
		return new MapExpress.Layers.WmsImageOverlayLayer(wmsProvider, options);
	};
	
}).call(this);;