L.MapExpress = {
    version: '0.0.1',
    
    Controls: {},
    
    Data:{},
    
    Geo:{},
    
	Layers: {},
	
    Utils:{},
	
	Mapping:{}
};

if(typeof window !== 'undefined' && window.L){
  window.L.MapExpress = L.MapExpress;
}