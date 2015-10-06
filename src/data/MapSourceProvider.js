(function() {
	"use strict";
	L.MapExpress.Data.MapSourceProvider = L.Class.extend({
		
		statics: {
        },
		
		options: {
		},
		
		initialize: function (options) {
			
		},
		
		getFeatureInfo: function (latlng) {
	
		}
	});
	
	L.MapExpress.Data.mapSourceProvider = function (options) {
		return new L.MapExpress.Data.MapSourceProvider(options);
	};
	
}).call(this);
