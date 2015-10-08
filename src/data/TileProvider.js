(function() {
	"use strict";
	L.MapExpress.Data.TileProvider = L.MapExpress.Data.MapSourceProvider.extend({

		options : {
			maxZoom: 23,
			subdomains: 'abc'
		},
		
		initialize : function (url, options) {
			L.MapExpress.Data.MapSourceProvider.prototype.initialize.call(this,options);
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
	
	L.MapExpress.Data.tileProvider = function (url, options) {
		return new L.MapExpress.Data.TileProvider(url, options);
	};
	
}).call(this);
