L.MapExpress.Data.WmsProvider = L.MapExpress.Data.MapSourceProvider.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.3.0',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},
	
	options: {
		tileSize : 256,
		crs: L.CRS.EPSG3857,
		uppercase: false
	},
    
	initialize : function (url, options) {
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
	
	getImageByTile: function (tileCoord) {
		var tileBounds = this._tileCoordsToBounds(tileCoord);
		var mapSize = new L.Point(this.options.tileSize, this.options.tileSize);		
		return this.getImage(tileBounds,mapSize);
	},
	
	getImage: function (mapBounds, mapSize) {
		var img = new Image();
		if (this.options.crossOrigin) {
			img.crossOrigin = '';
		}
		img.src = this._getMapUrl(mapBounds, mapSize);
		img.alt = this.options.alt;
		return img;
	},
	
	_getMapUrl: function (mapBounds, mapSize) {
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

	_tileCoordsToBounds: function (tileCoord) {
		var tileSize = this.options.tileSize;
		var crs = L.CRS.EPSG3857;
		
		var nwPoint = new L.Point(tileCoord.x * tileSize,tileCoord.y * tileSize);
		var sePoint = new L.Point(nwPoint.x + tileSize, nwPoint.y + tileSize);
		
		var nwUnprojected = crs.pointToLatLng(nwPoint, tileCoord.z);
		var seUnprojected = crs.pointToLatLng(sePoint, tileCoord.z);
		
		var nw = crs.wrapLatLng(nwUnprojected);
		var se = crs.wrapLatLng(seUnprojected);
		return new L.LatLngBounds(nw, se);
	}

});