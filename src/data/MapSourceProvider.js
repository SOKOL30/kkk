(function() {
	L.MapExpress.Data.MapSourceProvider = L.Class.extend({
		options: {
		},
		
		initialize: function (options) {
			L.setOptions(this, options);
		},
		
		getFeatureInfo: function (latlng) {
		// getGeoObject: function (mouseEvent) {
		//    this._lastLatLng = mouseEvent.latlng;
		//    $.ajax({
		//        url: 'http://catalog.api.2gis.ru/geo/search',
		//        data: {
		//            q: mouseEvent.latlng.lng + ',' + mouseEvent.latlng.lat,
		//            key: this.API_KEY,
		//            version: this.API_VERSION,
		//            output: 'jsonp',
		//            types: 'house,sight,station_platform'
		//       },
		//       dataType: 'jsonp',
		//       success: this.showPopup,
		//       context: this
		//   });
		// API_KEY: 'rujrdp3400'
		}

		
		
	});
	
	L.MapExpress.Data.mapSourceProvider = function (options) {
		return new L.MapExpress.Data.mapSourceProvider(options);
	};
	
}).call(this);
