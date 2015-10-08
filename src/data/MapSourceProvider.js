(function() {
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
